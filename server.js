const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { IPL_TEAMS } = require('./playersData');
const { 
  generatePlayerPool, 
  getNextBidIncrement, 
  canTeamBid, 
  evaluateBotInterest, 
  autoSelectPlayingXI, 
  validatePlayingXI, 
  simulateSeason 
} = require('./auctionEngine');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const rooms = {};

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function initializeTeams() {
  const teams = {};
  IPL_TEAMS.forEach(team => {
    teams[team.id] = {
      id: team.id,
      name: team.name,
      fullName: team.fullName,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      shortCode: team.shortCode,
      purse: 100.0,
      totalSpent: 0,
      squad: [],
      customPlayingXI: null,
      owner: `${team.name} AI`,
      socketId: null,
      isHuman: false
    };
  });
  return teams;
}

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Create room
  socket.on('create_room', ({ userName, teamId, isComputerMode, intervalSeconds }, callback) => {
    try {
      const roomCode = generateRoomCode();
      const teams = initializeTeams();

      if (teams[teamId]) {
        teams[teamId].owner = userName;
        teams[teamId].socketId = socket.id;
        teams[teamId].isHuman = true;
      }

      const playerPool = generatePlayerPool(150);

      rooms[roomCode] = {
        roomCode,
        isComputerMode: !!isComputerMode,
        intervalSeconds: parseInt(intervalSeconds, 10) || 10,
        status: 'lobby',
        playersPool: playerPool,
        currentPlayerIndex: -1,
        teams,
        timer: null,
        timeLeft: 0,
        logs: [`Room created by ${userName} (${teams[teamId]?.name}).`],
        simulationResult: null,
        fastForwardVotes: new Set(),
        sockets: {
          [socket.id]: { userName, teamId, isHost: true }
        }
      };

      socket.join(roomCode);

      if (typeof callback === 'function') {
        callback({
          success: true,
          roomCode,
          roomState: getSanitizedRoomState(rooms[roomCode])
        });
      }
    } catch (err) {
      console.error(err);
      if (typeof callback === 'function') callback({ success: false, message: err.message });
    }
  });

  // Join room
  socket.on('join_room', ({ roomCode, userName, teamId }, callback) => {
    try {
      const code = (roomCode || '').toUpperCase().trim();
      const room = rooms[code];

      if (!room) {
        return callback({ success: false, message: "Room not found! Check room code." });
      }
      if (room.status !== 'lobby') {
        return callback({ success: false, message: "Auction already started in this room!" });
      }
      if (room.teams[teamId] && room.teams[teamId].isHuman) {
        return callback({ success: false, message: `${room.teams[teamId].name} is already chosen by ${room.teams[teamId].owner}!` });
      }
      if (!room.teams[teamId]) {
        return callback({ success: false, message: "Invalid city team selected." });
      }

      room.teams[teamId].owner = userName;
      room.teams[teamId].socketId = socket.id;
      room.teams[teamId].isHuman = true;
      room.sockets[socket.id] = { userName, teamId, isHost: false };

      room.logs.push(`${userName} joined as manager of ${room.teams[teamId].name}.`);
      socket.join(code);

      io.to(code).emit('room_updated', getSanitizedRoomState(room));

      if (typeof callback === 'function') {
        callback({
          success: true,
          roomCode: code,
          roomState: getSanitizedRoomState(room)
        });
      }
    } catch (err) {
      console.error(err);
      if (typeof callback === 'function') callback({ success: false, message: err.message });
    }
  });

  // Start Auction
  socket.on('start_auction', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false, message: "Room not found" });

    Object.keys(room.teams).forEach(tId => {
      if (!room.teams[tId].isHuman) {
        room.teams[tId].owner = `${room.teams[tId].name} AI`;
        room.teams[tId].isHuman = false;
      }
    });

    const humanCount = Object.values(room.teams).filter(t => t.isHuman).length;
    const botCount = 10 - humanCount;
    room.logs.push(`Auction started with ${humanCount} human player(s) and ${botCount} computer team(s)!`);

    room.status = 'auction';
    io.to(roomCode).emit('room_updated', getSanitizedRoomState(room));

    nextPlayer(roomCode);
    if (typeof callback === 'function') callback({ success: true });
  });

  // Place Bid
  socket.on('place_bid', ({ roomCode, teamId }, callback) => {
    const room = rooms[roomCode];
    if (!room || room.status !== 'auction') return callback?.({ success: false, message: "Not in active auction" });

    const player = room.playersPool[room.currentPlayerIndex];
    if (!player || player.status !== 'bidding') return callback?.({ success: false, message: "No active bidding" });

    const team = room.teams[teamId];
    if (!team) return callback?.({ success: false, message: "Team not found" });

    let nextBid = 0;
    if (player.currentBid === 0) {
      nextBid = player.basePrice;
    } else {
      const inc = getNextBidIncrement(player.currentBid);
      nextBid = +(player.currentBid + inc).toFixed(2);
    }

    if (player.currentBidder === team.id) {
      return callback?.({ success: false, message: "You already hold the highest bid!" });
    }

    const check = canTeamBid(team, nextBid, player.isOverseas);
    if (!check.allowed) {
      return callback?.({ success: false, message: check.reason });
    }

    player.currentBid = nextBid;
    player.currentBidder = team.id;
    player.currentBidderName = team.name;

    room.timeLeft = Math.max(room.timeLeft, Math.min(room.intervalSeconds, 7));

    const bidLog = `${team.name} bids \u20B9${nextBid.toFixed(2)} Cr for ${player.name}!`;
    room.logs.push(bidLog);

    io.to(roomCode).emit('bid_placed', {
      player,
      bidLog,
      teamId: team.id,
      roomState: getSanitizedRoomState(room)
    });

    if (typeof callback === 'function') callback({ success: true, nextBid });
  });

  // Fast-Forward — multiplayer requires consensus
  socket.on('force_next_player', ({ roomCode, teamId }, callback) => {
    const room = rooms[roomCode];
    if (!room || room.status !== 'auction') return callback?.({ success: false });

    // Solo mode: instant skip
    if (room.isComputerMode) {
      if (room.timer) clearInterval(room.timer);
      simulateBiddingWar(room, false);
      finalizeCurrentPlayer(room);
      if (typeof callback === 'function') callback({ success: true });
      return;
    }

    // Multiplayer: need all humans to vote
    if (teamId) {
      room.fastForwardVotes.add(teamId);
    }

    const humanTeams = Object.values(room.teams).filter(t => t.isHuman);
    const totalHumans = humanTeams.length;
    const currentVotes = room.fastForwardVotes.size;

    io.to(roomCode).emit('fast_forward_vote', {
      votes: currentVotes,
      needed: totalHumans,
      voterTeamId: teamId
    });

    if (currentVotes >= totalHumans) {
      room.fastForwardVotes.clear();
      if (room.timer) clearInterval(room.timer);
      simulateBiddingWar(room, false);
      finalizeCurrentPlayer(room);
    }

    if (typeof callback === 'function') callback({ success: true, votes: currentVotes, needed: totalHumans });
  });

  
  // Auto Complete Auction
  socket.on('auto_complete_auction', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room || room.status !== 'auction') return callback?.({ success: false });
    
    if (room.timer) clearInterval(room.timer);
    room.logs.push(`\u26A1 AUTO-COMPLETING AUCTION... Remaining players will be auto-assigned!`);
    
    while (room.currentPlayerIndex < room.playersPool.length) {
      const player = room.playersPool[room.currentPlayerIndex];
      if (player.status === 'upcoming' || player.status === 'bidding') {
        player.status = 'bidding';
        simulateBiddingWar(room, true);
        
        // Sync Finalize
        if (player.currentBidder && player.currentBid > 0) {
          player.status = 'sold';
          player.soldTo = player.currentBidder;
          player.soldPrice = player.currentBid;
          const winnerTeam = room.teams[player.currentBidder];
          if (winnerTeam) {
            winnerTeam.purse = +(winnerTeam.purse - player.soldPrice).toFixed(2);
            winnerTeam.totalSpent = +(winnerTeam.totalSpent + player.soldPrice).toFixed(2);
            winnerTeam.squad.push({
              id: player.id, name: player.name, country: player.country, role: player.role,
              isOverseas: player.isOverseas, bat: player.bat, bowl: player.bowl, ovr: player.ovr,
              trait: player.trait, soldPrice: player.soldPrice,
              idealBattingPos: player.idealBattingPos || [],
              idealBowlingOvers: player.idealBowlingOvers || []
            });
          }
        } else {
          player.status = 'unsold';
        }
        
        const allFull = Object.values(room.teams).every(t => t.squad.length >= 15);
        if (allFull) break;
      }
      room.currentPlayerIndex++;
    }
    
    proceedToXISelection(room);
    if (typeof callback === 'function') callback({ success: true });
  });

  // Submit Playing XI
  socket.on('submit_playing_xi', ({ roomCode, teamId, playerIds }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false, message: "Room not found" });

    const team = room.teams[teamId];
    if (!team) return callback?.({ success: false, message: "Team not found" });

    const chosenPlayers = team.squad.filter(p => playerIds.includes(p.id));

    const check = validatePlayingXI(chosenPlayers);
    if (!check.valid) {
      return callback?.({ success: false, message: check.reason });
    }

    team.customPlayingXI = chosenPlayers;
    team.xiReady = true;

    room.logs.push(`${team.name} locked in their Playing XI!`);

    io.to(roomCode).emit('team_xi_updated', {
      teamId,
      teamName: team.name,
      roomState: getSanitizedRoomState(room)
    });

    checkAllHumansReadyAndSimulate(room);

    if (typeof callback === 'function') callback({ success: true });
  });

  // Force Start Simulation
  socket.on('force_start_simulation', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false });
    runSeasonSimulation(room);
    if (typeof callback === 'function') callback({ success: true });
  });

  // Reconnect / Rejoin — allows a player who refreshed or lost connection to rejoin
  socket.on('rejoin_room', ({ roomCode, teamId, userName }, callback) => {
    try {
      const room = rooms[roomCode];
      if (!room) return callback?.({ success: false, message: "Room no longer exists." });

      const team = room.teams[teamId];
      if (!team) return callback?.({ success: false, message: "Team not found." });

      // Re-associate the socket
      team.socketId = socket.id;
      team.isHuman = true;
      team.owner = userName;
      room.sockets[socket.id] = { userName, teamId, isHost: false };

      socket.join(roomCode);

      room.logs.push(`${userName} reconnected to ${team.name}.`);

      io.to(roomCode).emit('room_updated', getSanitizedRoomState(room));

      if (typeof callback === 'function') {
        callback({
          success: true,
          roomCode,
          roomState: getSanitizedRoomState(room)
        });
      }
    } catch (err) {
      console.error('Rejoin error:', err);
      if (typeof callback === 'function') callback({ success: false, message: err.message });
    }
  });

  // Disconnect — log but keep team as human (allow rejoin)
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    // We do NOT remove the team's isHuman flag so the slot stays reserved
    // The player can rejoin with rejoin_room
  });
});

function nextPlayer(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  room.currentPlayerIndex++;
  room.fastForwardVotes = new Set(); // reset votes for new player

  if (room.currentPlayerIndex >= room.playersPool.length) {
    proceedToXISelection(room);
    return;
  }

  const player = room.playersPool[room.currentPlayerIndex];
  player.status = 'bidding';
  player.currentBid = 0;
  player.currentBidder = null;
  player.currentBidderName = null;

  room.timeLeft = room.intervalSeconds;

  const announcement = `\uD83D\uDCE2 Up for bidding: ${player.name} (${player.role}, ${player.country}) - Base Price: \u20B9${player.basePrice} Cr! [Trait: ${player.trait}]`;
  room.logs.push(announcement);

  io.to(roomCode).emit('player_announced', {
    player,
    announcement,
    roomState: getSanitizedRoomState(room)
  });

  if (room.timer) clearInterval(room.timer);

  room.timer = setInterval(() => {
    room.timeLeft--;
    evaluateAiBids(room);

    io.to(roomCode).emit('timer_tick', {
      timeLeft: room.timeLeft,
      currentBid: player.currentBid,
      currentBidder: player.currentBidder,
      currentBidderName: player.currentBidderName
    });

    if (room.timeLeft <= 0) {
      clearInterval(room.timer);
      finalizeCurrentPlayer(room);
    }
  }, 1000);
}


function simulateBiddingWar(room, includeHumans = false) {
  const player = room.playersPool[room.currentPlayerIndex];
  if (!player || player.status !== 'bidding') return;

  let keepBidding = true;
  let maxIterations = 200;

  while (keepBidding && maxIterations > 0) {
    maxIterations--;
    let nextAmount = player.currentBid === 0 ? player.basePrice : +(player.currentBid + getNextBidIncrement(player.currentBid)).toFixed(2);
    
    const biddingTeams = Object.values(room.teams).filter(t => 
      (includeHumans || !t.isHuman) && t.id !== player.currentBidder
    );
    const interestedBots = biddingTeams.filter(t => evaluateBotInterest(t, player, nextAmount));

    if (interestedBots.length > 0) {
      const chosenTeam = interestedBots[Math.floor(Math.random() * interestedBots.length)];
      player.currentBid = nextAmount;
      player.currentBidder = chosenTeam.id;
      player.currentBidderName = chosenTeam.name;
      
      const bidLog = `${chosenTeam.name} ${chosenTeam.isHuman ? '(Auto)' : '(AI)'} bids \u20B9${nextAmount.toFixed(2)} Cr (Simulated)!`;
      room.logs.push(bidLog);
    } else {
      keepBidding = false;
    }
  }
}

function evaluateAiBids(room) {
  const player = room.playersPool[room.currentPlayerIndex];
  if (!player || player.status !== 'bidding') return;

  const botTeams = Object.values(room.teams).filter(t => !t.isHuman && t.id !== player.currentBidder);
  if (botTeams.length === 0) return;

  let nextAmount = player.currentBid === 0 ? player.basePrice : +(player.currentBid + getNextBidIncrement(player.currentBid)).toFixed(2);
  const interestedBots = botTeams.filter(bot => evaluateBotInterest(bot, player, nextAmount));

  if (interestedBots.length > 0) {
    if (Math.random() < 0.65) {
      const chosenBot = interestedBots[Math.floor(Math.random() * interestedBots.length)];

      player.currentBid = nextAmount;
      player.currentBidder = chosenBot.id;
      player.currentBidderName = chosenBot.name;

      room.timeLeft = Math.max(room.timeLeft, Math.min(room.intervalSeconds, 6));

      const bidLog = `${chosenBot.name} (AI) bids \u20B9${nextAmount.toFixed(2)} Cr!`;
      room.logs.push(bidLog);

      io.to(room.roomCode).emit('bid_placed', {
        player,
        bidLog,
        teamId: chosenBot.id,
        roomState: getSanitizedRoomState(room)
      });
    }
  }
}

function finalizeCurrentPlayer(room) {
  const player = room.playersPool[room.currentPlayerIndex];
  if (!player) return;

  if (player.currentBidder && player.currentBid > 0) {
    player.status = 'sold';
    player.soldTo = player.currentBidder;
    player.soldPrice = player.currentBid;

    const winnerTeam = room.teams[player.currentBidder];
    if (winnerTeam) {
      winnerTeam.purse = +(winnerTeam.purse - player.soldPrice).toFixed(2);
      winnerTeam.totalSpent = +(winnerTeam.totalSpent + player.soldPrice).toFixed(2);
      winnerTeam.squad.push({
        id: player.id,
        name: player.name,
        country: player.country,
        role: player.role,
        isOverseas: player.isOverseas,
        bat: player.bat,
        bowl: player.bowl,
        ovr: player.ovr,
        trait: player.trait,
        soldPrice: player.soldPrice,
        idealBattingPos: player.idealBattingPos || [],
        idealBowlingOvers: player.idealBowlingOvers || []
      });

      const hammerLog = `\uD83D\uDD28 SOLD! ${player.name} sold to ${winnerTeam.name} for \u20B9${player.soldPrice.toFixed(2)} Cr!`;
      room.logs.push(hammerLog);
      io.to(room.roomCode).emit('player_sold', {
        player,
        team: winnerTeam,
        hammerLog,
        roomState: getSanitizedRoomState(room)
      });
    }
  } else {
    player.status = 'unsold';
    const unsoldLog = `\u274C UNSOLD! No bids received for ${player.name}.`;
    room.logs.push(unsoldLog);
    io.to(room.roomCode).emit('player_unsold', {
      player,
      unsoldLog,
      roomState: getSanitizedRoomState(room)
    });
  }

  const allFull = Object.values(room.teams).every(t => t.squad.length >= 15);
  if (allFull) {
    setTimeout(() => proceedToXISelection(room), 2500);
  } else {
    setTimeout(() => nextPlayer(room.roomCode), 2500);
  }
}

function proceedToXISelection(room) {
  if (room.timer) clearInterval(room.timer);
  room.status = 'xi_selection';

  Object.values(room.teams).forEach(team => {
    const hasWK = team.squad.some(p => p.role === "Wicketkeeper");
    if (!hasWK) {
      team.squad.push({
        id: `rookie_wk_${team.id}`,
        name: "Academy Wicketkeeper",
        country: "IND",
        role: "Wicketkeeper",
        isOverseas: false,
        bat: 70, bowl: 20, ovr: 72,
        trait: "Lightning Gloves",
        soldPrice: 0.20,
        idealBattingPos: [5, 6, 7],
        idealBowlingOvers: []
      });
    }

    while (team.squad.length < 11) {
      const rookieNum = team.squad.length + 1;
      team.squad.push({
        id: `rookie_${team.id}_${rookieNum}`,
        name: `Academy Talent #${rookieNum}`,
        country: "IND",
        role: rookieNum % 2 === 0 ? "Fast Bowler" : "Batsman",
        isOverseas: false,
        bat: 65, bowl: 65, ovr: 65,
        trait: "Emerging Player",
        soldPrice: 0.20,
        idealBattingPos: [],
        idealBowlingOvers: rookieNum % 2 === 0 ? ["7-15"] : []
      });
    }

    team.customPlayingXI = autoSelectPlayingXI(team.squad);
    team.xiReady = !team.isHuman;
  });

  room.logs.push("\uD83C\uDF89 AUCTION CONCLUDED! Managers are now selecting their Playing XI.");

  io.to(room.roomCode).emit('start_xi_selection', {
    roomState: getSanitizedRoomState(room)
  });

  checkAllHumansReadyAndSimulate(room);
}

function checkAllHumansReadyAndSimulate(room) {
  const allReady = Object.values(room.teams).every(t => !t.isHuman || t.xiReady);
  if (allReady) {
    runSeasonSimulation(room);
  }
}

function runSeasonSimulation(room) {
  room.status = 'season_simulated';
  room.logs.push("\uD83C\uDFDF\uFE0F All Playing XIs confirmed! Running full IPL Season Simulation...");

  const simResult = simulateSeason(Object.values(room.teams));
  room.simulationResult = simResult;

  io.to(room.roomCode).emit('season_completed', {
    simulationResult: simResult,
    roomState: getSanitizedRoomState(room)
  });
}

function getSanitizedRoomState(room) {
  const soldPlayers = room.playersPool
    .filter(p => p.status === 'sold')
    .map(p => ({ id: p.id, name: p.name, role: p.role, ovr: p.ovr, soldTo: p.soldTo, soldPrice: p.soldPrice }));

  // Sanitize teams — strip socketId to avoid leaking internal state
  const sanitizedTeams = {};
  Object.keys(room.teams).forEach(tId => {
    const t = room.teams[tId];
    sanitizedTeams[tId] = {
      id: t.id,
      name: t.name,
      fullName: t.fullName,
      primaryColor: t.primaryColor,
      secondaryColor: t.secondaryColor,
      shortCode: t.shortCode,
      purse: t.purse,
      totalSpent: t.totalSpent,
      squad: t.squad,
      customPlayingXI: t.customPlayingXI,
      owner: t.owner,
      isHuman: t.isHuman,
      xiReady: t.xiReady || false
    };
  });

  return {
    roomCode: room.roomCode,
    isComputerMode: room.isComputerMode,
    intervalSeconds: room.intervalSeconds,
    status: room.status,
    currentPlayerIndex: room.currentPlayerIndex,
    currentPlayer: room.playersPool[room.currentPlayerIndex] || null,
    upcomingPlayers: room.playersPool
      .slice(room.currentPlayerIndex + 1, room.currentPlayerIndex + 11)
      .filter(p => p.status === 'upcoming')
      .map(p => ({ id: p.id, name: p.name, role: p.role, basePrice: p.basePrice, ovr: p.ovr, country: p.country, isOverseas: p.isOverseas })),
    soldPlayers,
    totalPlayers: room.playersPool.length,
    teams: sanitizedTeams,
    timeLeft: room.timeLeft,
    logs: room.logs.slice(-25),
    simulationResult: room.simulationResult
  };
}

app.get('/api/teams', (req, res) => {
  res.json(IPL_TEAMS);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`IPL Auction Game server running on port ${PORT}`);
});
