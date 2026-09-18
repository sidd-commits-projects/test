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

// Store rooms in memory
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

      // Assign host team
      if (teams[teamId]) {
        teams[teamId].owner = userName;
        teams[teamId].socketId = socket.id;
        teams[teamId].isHuman = true;
      }

      const playerPool = generatePlayerPool(60);

      rooms[roomCode] = {
        roomCode,
        isComputerMode: !!isComputerMode,
        intervalSeconds: parseInt(intervalSeconds, 10) || 10,
        status: 'lobby', // 'lobby' | 'auction' | 'xi_selection' | 'season_simulated'
        playersPool: playerPool,
        currentPlayerIndex: -1,
        teams,
        timer: null,
        timeLeft: 0,
        logs: [`Room created by ${userName} (${teams[teamId]?.name}).`],
        simulationResult: null,
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

      // Claim team
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

  // Start Auction (Any human players keep their teams; all other remaining 8 or 9 teams are AI bots!)
  socket.on('start_auction', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false, message: "Room not found" });

    // Ensure all unselected teams remain AI computers
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

    // Accept bid
    player.currentBid = nextBid;
    player.currentBidder = team.id;
    player.currentBidderName = team.name;

    room.timeLeft = Math.max(room.timeLeft, Math.min(room.intervalSeconds, 7));

    const bidLog = `${team.name} bids ₹${nextBid.toFixed(2)} Cr for ${player.name}!`;
    room.logs.push(bidLog);

    io.to(roomCode).emit('bid_placed', {
      player,
      bidLog,
      teamId: team.id,
      roomState: getSanitizedRoomState(room)
    });

    if (typeof callback === 'function') callback({ success: true, nextBid });
  });

  // Fast-Forward / Skip to next player (Host capability)
  socket.on('force_next_player', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room || room.status !== 'auction') return callback?.({ success: false });
    if (room.timer) clearInterval(room.timer);
    finalizeCurrentPlayer(room);
    if (typeof callback === 'function') callback({ success: true });
  });

  // Submit Playing XI by a human player
  socket.on('submit_playing_xi', ({ roomCode, teamId, playerIds }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false, message: "Room not found" });

    const team = room.teams[teamId];
    if (!team) return callback?.({ success: false, message: "Team not found" });

    // Reconstruct XI objects from playerIds in squad
    const chosenPlayers = team.squad.filter(p => playerIds.includes(p.id));

    // Validate XI with mandatory Wicketkeeper and max 4 overseas
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

    // Check if all human teams have submitted their XI
    checkAllHumansReadyAndSimulate(room);

    if (typeof callback === 'function') callback({ success: true });
  });

  // Force Start Simulation (Host can trigger without waiting)
  socket.on('force_start_simulation', ({ roomCode }, callback) => {
    const room = rooms[roomCode];
    if (!room) return callback?.({ success: false });
    runSeasonSimulation(room);
    if (typeof callback === 'function') callback({ success: true });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

function nextPlayer(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  room.currentPlayerIndex++;

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

  const announcement = `📢 Up for bidding: ${player.name} (${player.role}, ${player.country}) - Base Price: ₹${player.basePrice} Cr! [Trait: ${player.trait}]`;
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

      const bidLog = `${chosenBot.name} (AI) bids ₹${nextAmount.toFixed(2)} Cr!`;
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
        soldPrice: player.soldPrice
      });

      const hammerLog = `🔨 SOLD! ${player.name} sold to ${winnerTeam.name} for ₹${player.soldPrice.toFixed(2)} Cr!`;
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
    const unsoldLog = `❌ UNSOLD! No bids received for ${player.name}.`;
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

// Proceed to Playing XI Selection screen once auction finishes
function proceedToXISelection(room) {
  if (room.timer) clearInterval(room.timer);
  room.status = 'xi_selection';

  // Ensure every squad has at least 11 players and at least 1 Wicketkeeper!
  Object.values(room.teams).forEach(team => {
    // Check if team has a wicketkeeper; if not, add one
    const hasWK = team.squad.some(p => p.role === "Wicketkeeper");
    if (!hasWK) {
      team.squad.push({
        id: `rookie_wk_${team.id}`,
        name: `Academy Wicketkeeper`,
        country: "IND",
        role: "Wicketkeeper",
        isOverseas: false,
        bat: 70,
        bowl: 20,
        ovr: 72,
        trait: "Lightning Gloves",
        soldPrice: 0.20
      });
    }

    // Fill remaining squad up to 11 if needed
    while (team.squad.length < 11) {
      const rookieNum = team.squad.length + 1;
      team.squad.push({
        id: `rookie_${team.id}_${rookieNum}`,
        name: `Academy Talent #${rookieNum}`,
        country: "IND",
        role: rookieNum % 2 === 0 ? "Fast Bowler" : "Batsman",
        isOverseas: false,
        bat: 65,
        bowl: 65,
        ovr: 65,
        trait: "Emerging Player",
        soldPrice: 0.20
      });
    }

    // Pre-populate default best XI (ensuring 1 WK and max 4 overseas)
    team.customPlayingXI = autoSelectPlayingXI(team.squad);
    team.xiReady = !team.isHuman; // Bots are immediately ready
  });

  room.logs.push("🎉 AUCTION CONCLUDED! Managers are now selecting their Playing XI (Mandatory 1 Wicketkeeper, Max 4 Overseas).");

  io.to(room.roomCode).emit('start_xi_selection', {
    roomState: getSanitizedRoomState(room)
  });

  // If all managers are bots, or if human chooses to simulate immediately
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
  room.logs.push("🏟️ All Playing XIs confirmed! Running full IPL Season Simulation...");

  const simResult = simulateSeason(Object.values(room.teams));
  room.simulationResult = simResult;

  io.to(room.roomCode).emit('season_completed', {
    simulationResult: simResult,
    roomState: getSanitizedRoomState(room)
  });
}

function getSanitizedRoomState(room) {
  return {
    roomCode: room.roomCode,
    isComputerMode: room.isComputerMode,
    intervalSeconds: room.intervalSeconds,
    status: room.status,
    currentPlayerIndex: room.currentPlayerIndex,
    currentPlayer: room.playersPool[room.currentPlayerIndex] || null,
    totalPlayers: room.playersPool.length,
    teams: room.teams,
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
