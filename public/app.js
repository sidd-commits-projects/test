// Frontend Controller & Socket.io client for IPL Mega Auction
const socket = io();

let gameState = {
  userName: '',
  selectedTeamId: 'mumbai',
  mode: 'solo',
  intervalSeconds: 10,
  roomCode: '',
  isHost: false,
  roomData: null,
  selectedXIIds: new Set()
};

const IPL_TEAMS_DATA = [
  { id: "mumbai", name: "Mumbai", fullName: "Mumbai Champions", primaryColor: "#004BA0", shortCode: "MUM" },
  { id: "chennai", name: "Chennai", fullName: "Chennai Super Kings", primaryColor: "#F9CD05", shortCode: "CHE" },
  { id: "bengaluru", name: "Bengaluru", fullName: "Bengaluru Challengers", primaryColor: "#DA1818", shortCode: "BLR" },
  { id: "kolkata", name: "Kolkata", fullName: "Kolkata Knights", primaryColor: "#3A225D", shortCode: "KOL" },
  { id: "delhi", name: "Delhi", fullName: "Delhi Capitals", primaryColor: "#17449E", shortCode: "DEL" },
  { id: "ahmedabad", name: "Ahmedabad", fullName: "Ahmedabad Titans", primaryColor: "#1B2133", shortCode: "AHM" },
  { id: "lucknow", name: "Lucknow", fullName: "Lucknow Super Giants", primaryColor: "#0057B8", shortCode: "LKN" },
  { id: "hyderabad", name: "Hyderabad", fullName: "Hyderabad Sunrisers", primaryColor: "#F26522", shortCode: "HYD" },
  { id: "jaipur", name: "Jaipur", fullName: "Jaipur Royals", primaryColor: "#EA1A85", shortCode: "JPR" },
  { id: "chandigarh", name: "Chandigarh", fullName: "Chandigarh Kings", primaryColor: "#ED1B24", shortCode: "CHD" }
];

// DOM Elements
const screenOnboarding = document.getElementById('screenOnboarding');
const screenLobby = document.getElementById('screenLobby');
const screenAuction = document.getElementById('screenAuction');
const screenXISelection = document.getElementById('screenXISelection');
const screenSeason = document.getElementById('screenSeason');

const inputUserName = document.getElementById('inputUserName');
const inputRoomCode = document.getElementById('inputRoomCode');
const joinCodeGroup = document.getElementById('joinCodeGroup');
const auctionSpeedGroup = document.getElementById('auctionSpeedGroup');
const citySelectorGrid = document.getElementById('citySelectorGrid');
const btnEnterLobby = document.getElementById('btnEnterLobby');

const roomInfoBar = document.getElementById('roomInfoBar');
const displayRoomCode = document.getElementById('displayRoomCode');
const displayModeBadge = document.getElementById('displayModeBadge');
const copyRoomBtn = document.getElementById('copyRoomBtn');

const userBadge = document.getElementById('userBadge');
const userAvatar = document.getElementById('userAvatar');
const displayUserName = document.getElementById('displayUserName');
const displayUserTeam = document.getElementById('displayUserTeam');

const lobbyRoomCode = document.getElementById('lobbyRoomCode');
const lobbyTeamsGrid = document.getElementById('lobbyTeamsGrid');
const copyInviteBtn = document.getElementById('copyInviteBtn');
const btnStartAuctionNow = document.getElementById('btnStartAuctionNow');

const lotCounter = document.getElementById('lotCounter');
const timerClock = document.getElementById('timerClock');
const playerStageContent = document.getElementById('playerStageContent');
const currentBidAmount = document.getElementById('currentBidAmount');
const currentBidderName = document.getElementById('currentBidderName');
const nextBidAmount = document.getElementById('nextBidAmount');
const btnPlaceBid = document.getElementById('btnPlaceBid');
const myTeamBidBtnName = document.getElementById('myTeamBidBtnName');
const bidBtnAmount = document.getElementById('bidBtnAmount');
const bidWarningText = document.getElementById('bidWarningText');
const teamsPurseList = document.getElementById('teamsPurseList');
const logsFeed = document.getElementById('logsFeed');
const mySquadList = document.getElementById('mySquadList');
const mySquadCount = document.getElementById('mySquadCount');
const myPurseLeft = document.getElementById('myPurseLeft');
const myOverseasCount = document.getElementById('myOverseasCount');
const forceNextBtn = document.getElementById('forceNextBtn');

// Playing XI elements
const xiSquadGrid = document.getElementById('xiSquadGrid');
const pillSelectedCount = document.getElementById('pillSelectedCount');
const pillWkCount = document.getElementById('pillWkCount');
const pillOverseasCount = document.getElementById('pillOverseasCount');
const xiValidationMsg = document.getElementById('xiValidationMsg');
const btnAutoSelectXI = document.getElementById('btnAutoSelectXI');
const btnLockPlayingXI = document.getElementById('btnLockPlayingXI');

// Rules Modal
const rulesModal = document.getElementById('rulesModal');
const rulesModalBtn = document.getElementById('rulesModalBtn');
const closeRulesModal = document.getElementById('closeRulesModal');

// Sound synthesis via Web Audio API
const AudioFX = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },
  playTone(freq, type = 'sine', duration = 0.12, volume = 0.15) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },
  bid() {
    this.playTone(660, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(880, 'sine', 0.12, 0.2), 60);
  },
  hammer() {
    this.playTone(220, 'triangle', 0.25, 0.35);
    setTimeout(() => this.playTone(180, 'triangle', 0.3, 0.35), 100);
  },
  tick() {
    this.playTone(440, 'sine', 0.04, 0.05);
  },
  cheer() {
    this.playTone(523, 'sine', 0.15, 0.2);
    setTimeout(() => this.playTone(659, 'sine', 0.2, 0.2), 120);
    setTimeout(() => this.playTone(784, 'sine', 0.3, 0.2), 240);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  renderCityCards();
  setupEventListeners();
});

function renderCityCards() {
  citySelectorGrid.innerHTML = '';
  IPL_TEAMS_DATA.forEach(team => {
    const card = document.createElement('div');
    card.className = `city-card ${team.id === gameState.selectedTeamId ? 'selected' : ''}`;
    card.style.setProperty('--team-color', team.primaryColor);
    card.setAttribute('data-team-id', team.id);

    card.innerHTML = `
      <div class="city-badge-tag" style="color: ${team.primaryColor}">${team.shortCode}</div>
      <div class="city-name">${team.name}</div>
      <div class="city-full">${team.fullName}</div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.city-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      gameState.selectedTeamId = team.id;
      updateHeaderBadge();
    });

    citySelectorGrid.appendChild(card);
  });
}

function setupEventListeners() {
  document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
      e.target.closest('.mode-card').classList.add('active');
      gameState.mode = e.target.value;

      if (gameState.mode === 'multiplayer_join') {
        joinCodeGroup.style.display = 'block';
        auctionSpeedGroup.style.display = 'none';
        btnEnterLobby.querySelector('.btn-text').textContent = 'JOIN MULTIPLAYER ROOM';
      } else if (gameState.mode === 'multiplayer_create') {
        joinCodeGroup.style.display = 'none';
        auctionSpeedGroup.style.display = 'block';
        btnEnterLobby.querySelector('.btn-text').textContent = 'CREATE MULTIPLAYER ROOM';
      } else {
        joinCodeGroup.style.display = 'none';
        auctionSpeedGroup.style.display = 'block';
        btnEnterLobby.querySelector('.btn-text').textContent = 'START AUCTION VS 9 COMPUTERS';
      }
    });
  });

  document.querySelectorAll('input[name="auctionInterval"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.speed-pill').forEach(p => p.classList.remove('active'));
      e.target.closest('.speed-pill').classList.add('active');
      gameState.intervalSeconds = parseInt(e.target.value, 10);
    });
  });

  rulesModalBtn.addEventListener('click', () => rulesModal.classList.add('active'));
  closeRulesModal.addEventListener('click', () => rulesModal.classList.remove('active'));
  rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) rulesModal.classList.remove('active');
  });

  const copyFn = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert(`Room Code ${code} copied to clipboard! Share it with friends.`);
    }).catch(() => {
      prompt("Copy your room code:", code);
    });
  };
  copyRoomBtn.addEventListener('click', () => copyFn(gameState.roomCode));
  copyInviteBtn.addEventListener('click', () => copyFn(gameState.roomCode));

  btnEnterLobby.addEventListener('click', handleEnterLobby);

  btnStartAuctionNow.addEventListener('click', () => {
    socket.emit('start_auction', { roomCode: gameState.roomCode }, (res) => {
      if (!res?.success) alert(res?.message || 'Could not start auction');
    });
  });

  btnPlaceBid.addEventListener('click', () => {
    AudioFX.init();
    socket.emit('place_bid', {
      roomCode: gameState.roomCode,
      teamId: gameState.selectedTeamId
    }, (res) => {
      if (!res.success) {
        bidWarningText.textContent = res.message || 'Cannot place bid!';
        setTimeout(() => { bidWarningText.textContent = ''; }, 3000);
      } else {
        AudioFX.bid();
      }
    });
  });

  forceNextBtn.addEventListener('click', () => {
    socket.emit('force_next_player', { roomCode: gameState.roomCode });
  });

  // Playing XI Controls
  btnAutoSelectXI.addEventListener('click', autoSelectMyXI);
  btnLockPlayingXI.addEventListener('click', submitMyPlayingXI);

  document.querySelectorAll('.panel-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.panel-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel-live-log .tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('.season-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.season-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.season-view').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-view');
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });

  document.getElementById('btnPlayAgain').addEventListener('click', () => {
    window.location.reload();
  });
}

function handleEnterLobby() {
  const name = inputUserName.value.trim() || 'Player 1';
  gameState.userName = name;
  AudioFX.init();

  if (gameState.mode === 'multiplayer_join') {
    const code = inputRoomCode.value.trim().toUpperCase();
    if (!code || code.length !== 4) {
      alert("Please enter a valid 4-character Room Code.");
      return;
    }
    gameState.roomCode = code;
    gameState.isHost = false;

    socket.emit('join_room', {
      roomCode: code,
      userName: name,
      teamId: gameState.selectedTeamId
    }, (res) => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      onRoomJoined(res.roomState, res.roomCode);
    });
  } else {
    const isSolo = gameState.mode === 'solo';
    gameState.isHost = true;

    socket.emit('create_room', {
      userName: name,
      teamId: gameState.selectedTeamId,
      isComputerMode: isSolo,
      intervalSeconds: gameState.intervalSeconds
    }, (res) => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      onRoomJoined(res.roomState, res.roomCode);

      if (isSolo) {
        setTimeout(() => {
          socket.emit('start_auction', { roomCode: res.roomCode });
        }, 600);
      }
    });
  }
}

function onRoomJoined(roomState, roomCode) {
  gameState.roomCode = roomCode;
  gameState.roomData = roomState;

  updateHeaderBadge();
  roomInfoBar.style.display = 'flex';
  displayRoomCode.textContent = roomCode;
  lobbyRoomCode.textContent = roomCode;

  if (roomState.isComputerMode) {
    displayModeBadge.textContent = 'VS 9 COMPUTERS';
  } else {
    displayModeBadge.textContent = 'MULTIPLAYER ROOM';
  }

  showScreen(screenLobby);
  renderLobbyTeams(roomState.teams);
}

function updateHeaderBadge() {
  userBadge.style.display = 'flex';
  userAvatar.textContent = (gameState.userName[0] || 'M').toUpperCase();
  displayUserName.textContent = gameState.userName || 'Manager';
  const teamObj = IPL_TEAMS_DATA.find(t => t.id === gameState.selectedTeamId);
  displayUserTeam.textContent = teamObj ? teamObj.name : 'Franchise';
  myTeamBidBtnName.textContent = teamObj ? teamObj.name.toUpperCase() : 'YOUR TEAM';
}

function showScreen(screenEl) {
  [screenOnboarding, screenLobby, screenAuction, screenXISelection, screenSeason].forEach(s => s.classList.remove('active'));
  screenEl.classList.add('active');
}

function renderLobbyTeams(teams) {
  lobbyTeamsGrid.innerHTML = '';
  Object.values(teams).forEach(team => {
    const card = document.createElement('div');
    card.className = `lobby-team-card ${team.isHuman ? 'human-slot' : ''}`;
    
    card.innerHTML = `
      <div class="team-color-strip" style="background: ${team.primaryColor}"></div>
      <div class="lobby-team-name">${team.name}</div>
      <div class="lobby-owner-badge ${team.isHuman ? 'badge-human' : 'badge-bot'}">
        ${team.isHuman ? `👤 ${team.owner}` : `🤖 Computer AI`}
      </div>
    `;
    lobbyTeamsGrid.appendChild(card);
  });
}

function renderAuctionStage(player, roomState) {
  showScreen(screenAuction);
  if (!player) return;

  lotCounter.textContent = `Player ${roomState.currentPlayerIndex + 1} of ${roomState.totalPlayers}`;

  const roleColors = {
    "Batsman": "#00f2fe",
    "Wicketkeeper": "#eab308",
    "Fast Bowler": "#ff5e62",
    "Fast Bowling Allrounder": "#f9b233",
    "Spin Bowling Allrounder": "#f9b233",
    "Spinner": "#a855f7",
    "Medium Pace Bowler": "#10b981"
  };
  const roleColor = roleColors[player.role] || "#00f2fe";

  playerStageContent.innerHTML = `
    <div class="player-card-hero">
      <div class="player-avatar-box">${player.role === 'Wicketkeeper' ? '🧤' : '🏏'}</div>
      <h2 class="player-name-stage">${player.name}</h2>
      <div class="player-meta-tags">
        <span class="meta-pill meta-role" style="border-color: ${roleColor}; color: ${roleColor}">${player.role}</span>
        <span class="meta-pill meta-country">${player.country}</span>
        ${player.isOverseas ? '<span class="meta-pill meta-overseas">✈️ Overseas</span>' : '<span class="meta-pill">🇮🇳 Domestic</span>'}
      </div>
      <div class="trait-callout">
        <span>⚡ SPECIAL TRAIT:</span> <strong>${player.trait}</strong>
      </div>

      <div class="player-stats-grid">
        <div class="stat-box">
          <div class="stat-box-title">OVERALL</div>
          <div class="stat-box-val val-ovr">${player.ovr}</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-title">BATTING</div>
          <div class="stat-box-val val-bat">${player.bat}</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-title">BOWLING</div>
          <div class="stat-box-val val-bowl">${player.bowl}</div>
        </div>
      </div>
    </div>
  `;

  updateBidConsole(player, roomState);
  renderTeamsPurseList(roomState.teams, player.currentBidder);
  renderMySquad(roomState.teams[gameState.selectedTeamId]);
}

function updateBidConsole(player, roomState) {
  if (!player) return;

  const currentBid = player.currentBid || 0;
  currentBidAmount.textContent = currentBid === 0 ? '₹0.00 Cr' : `₹${currentBid.toFixed(2)} Cr`;
  currentBidderName.textContent = player.currentBidderName || 'None';

  let nextBid = 0;
  if (currentBid === 0) {
    nextBid = player.basePrice;
  } else {
    let inc = 0.50;
    if (currentBid < 1.0) inc = 0.10;
    else if (currentBid < 2.0) inc = 0.20;
    else if (currentBid < 5.0) inc = 0.25;
    nextBid = +(currentBid + inc).toFixed(2);
  }

  nextBidAmount.textContent = `₹${nextBid.toFixed(2)} Cr`;
  bidBtnAmount.textContent = `₹${nextBid.toFixed(2)} Cr`;

  const myTeam = roomState.teams[gameState.selectedTeamId];
  if (player.currentBidder === gameState.selectedTeamId) {
    btnPlaceBid.disabled = true;
    bidWarningText.textContent = "You currently hold the highest bid!";
  } else if (myTeam && myTeam.purse < nextBid) {
    btnPlaceBid.disabled = true;
    bidWarningText.textContent = "Insufficient purse to bid!";
  } else if (myTeam && myTeam.squad.length >= 18) {
    btnPlaceBid.disabled = true;
    bidWarningText.textContent = "Squad limit reached (18/18)!";
  } else {
    btnPlaceBid.disabled = false;
    bidWarningText.textContent = "";
  }
}

function renderTeamsPurseList(teams, currentBidderId) {
  teamsPurseList.innerHTML = '';
  Object.values(teams).forEach(team => {
    const isMe = team.id === gameState.selectedTeamId;
    const isHighest = team.id === currentBidderId;

    const row = document.createElement('div');
    row.className = `team-purse-row ${isMe ? 'my-team-row' : ''} ${isHighest ? 'highest-bidder-row' : ''}`;
    row.style.setProperty('--team-color', team.primaryColor);

    const overseasCount = team.squad.filter(p => p.isOverseas).length;

    row.innerHTML = `
      <div class="team-row-left">
        <div class="team-row-name">
          ${team.name}
          ${team.isHuman ? '<span class="tag-human-mini">USER</span>' : ''}
        </div>
        <div class="team-row-squad">Squad: ${team.squad.length}/18 (${overseasCount}✈️)</div>
      </div>
      <div class="team-row-right">
        <div class="team-row-purse">₹${team.purse.toFixed(2)} Cr</div>
        <div class="team-row-spent">Spent: ₹${team.totalSpent.toFixed(2)} Cr</div>
      </div>
    `;

    teamsPurseList.appendChild(row);
  });
}

function renderMySquad(myTeam) {
  if (!myTeam) return;

  myPurseLeft.textContent = `₹${myTeam.purse.toFixed(2)} Cr`;
  const overseas = myTeam.squad.filter(p => p.isOverseas).length;
  myOverseasCount.textContent = `${overseas}/7`;
  mySquadCount.textContent = myTeam.squad.length;

  if (myTeam.squad.length === 0) {
    mySquadList.innerHTML = `<div class="empty-squad-msg">No players purchased yet. Place bids to build your XI!</div>`;
    return;
  }

  mySquadList.innerHTML = '';
  myTeam.squad.forEach((p, idx) => {
    const item = document.createElement('div');
    item.className = 'squad-player-row';
    item.innerHTML = `
      <div>
        <span class="squad-p-name">${idx + 1}. ${p.name} <span class="trait-tag-micro">[${p.trait}]</span></span>
        <span class="squad-p-sub">${p.role === 'Wicketkeeper' ? '🧤 ' : ''}${p.role} • OVR: ${p.ovr} ${p.isOverseas ? '✈️' : ''}</span>
      </div>
      <div class="squad-p-price">₹${p.soldPrice.toFixed(2)} Cr</div>
    `;
    mySquadList.appendChild(item);
  });
}

function addLog(text, type = 'normal') {
  const item = document.createElement('div');
  item.className = `log-item ${type === 'sold' ? 'log-sold' : type === 'unsold' ? 'log-unsold' : type === 'bid' ? 'log-bid' : ''}`;
  item.textContent = text;
  logsFeed.prepend(item);
}

// PLAYING XI SELECTION SCREEN LOGIC
function showPlayingXISelection(roomState) {
  showScreen(screenXISelection);
  const myTeam = roomState.teams[gameState.selectedTeamId];
  if (!myTeam) return;

  // Pre-select existing customPlayingXI or first 11
  gameState.selectedXIIds = new Set();
  if (myTeam.customPlayingXI && myTeam.customPlayingXI.length === 11) {
    myTeam.customPlayingXI.forEach(p => gameState.selectedXIIds.add(p.id));
  } else {
    autoSelectMyXI();
  }

  renderXISquadCards(myTeam.squad);
  updateXIValidation(myTeam.squad);
}



let draggedPlayerId = null;
let draggedSourceSlot = null; // To track if dragged from a slot

function renderXISquadCards(squad) {
  const xiSlotsPane = document.getElementById('xiSlotsPane');
  const xiBenchPane = document.getElementById('xiBenchPane');
  
  // Highlight helper for dragging
  const highlightSlots = (p) => {
    document.querySelectorAll('.xi-slot-row').forEach(row => {
      const slotNum = parseInt(row.getAttribute('data-slot')) + 1; // 1-11
      
      if (p.idealBattingPos && p.idealBattingPos.length > 0) {
        let minDiff = Math.min(...p.idealBattingPos.map(pref => Math.abs(pref - slotNum)));
        if (minDiff === 0) row.classList.add('slot-ideal');
        else if (minDiff <= 2) row.classList.add('slot-warning');
        else row.classList.add('slot-danger');
      } else {
        if (p.role === 'Batsman') {
          if (slotNum <= 6) row.classList.add('slot-ideal');
          else row.classList.add('slot-danger');
        } else if (p.role.includes('Bowler') || p.role === 'Spinner') {
          if (slotNum >= 8) row.classList.add('slot-ideal');
          else row.classList.add('slot-danger');
        } else {
          row.classList.add('slot-warning');
        }
      }
    });
  };

  const removeHighlights = () => {
    document.querySelectorAll('.xi-slot-row').forEach(r => {
       r.classList.remove('slot-ideal', 'slot-warning', 'slot-danger');
    });
  };

  if(xiSlotsPane) {
    xiSlotsPane.innerHTML = '';
    for(let i = 0; i < 11; i++) {
      const slotIndex = i;
      const row = document.createElement('div');
      row.className = 'xi-slot-row';
      row.setAttribute('data-slot', slotIndex);
      
      const num = document.createElement('div');
      num.className = 'xi-slot-num';
      num.textContent = (slotIndex + 1);
      
      const display = document.createElement('div');
      display.className = 'xi-slot-player-display';
      
      const currentPlayerId = gameState.playingXI[slotIndex];
      if (currentPlayerId) {
        const p = squad.find(x => x.id === currentPlayerId);
        display.draggable = true;
        
        let prefPos = p.idealBattingPos ? ` (Ideal: ${p.idealBattingPos.join(',')})` : '';
        let phase = p.idealBowlingOvers && p.idealBowlingOvers.length ? ` [${p.idealBowlingOvers.join(',')}]` : '';
        
        display.innerHTML = `<span>${p.name} (${p.role})${prefPos}${phase} ${p.isOverseas ? '✈️' : ''} OVR:${p.ovr}</span>
                             <button class="remove-player-btn" data-slot="${slotIndex}">X</button>`;
                             
        display.addEventListener('dragstart', (e) => {
          draggedPlayerId = p.id;
          draggedSourceSlot = slotIndex;
          display.classList.add('dragging');
          highlightSlots(p);
        });
        
        display.addEventListener('dragend', () => {
          display.classList.remove('dragging');
          draggedPlayerId = null;
          draggedSourceSlot = null;
          removeHighlights();
        });
      } else {
        display.innerHTML = `<span class="xi-slot-empty">Drag player here...</span>`;
      }

      // Drag and Drop Events for Slot
      row.addEventListener('dragover', (e) => {
        e.preventDefault(); // allow drop
      });
      row.addEventListener('dragenter', (e) => {
        e.preventDefault();
        row.classList.add('drag-over');
      });
      row.addEventListener('dragleave', () => {
        row.classList.remove('drag-over');
      });
      row.addEventListener('drop', (e) => {
        e.preventDefault();
        row.classList.remove('drag-over');
        if (draggedPlayerId) {
          // If moving from another slot
          if (draggedSourceSlot !== null) {
            // Swap logic
            const currentOccupant = gameState.playingXI[slotIndex];
            gameState.playingXI[draggedSourceSlot] = currentOccupant; 
          } else {
            // New from bench. If this player is already in XI elsewhere, remove from old slot
            const existingSlot = gameState.playingXI.indexOf(draggedPlayerId);
            if (existingSlot !== -1) {
              gameState.playingXI[existingSlot] = null;
            }
          }
          gameState.playingXI[slotIndex] = draggedPlayerId;
          
          draggedPlayerId = null;
          draggedSourceSlot = null;
          removeHighlights();
          
          renderXISquadCards(squad);
          updateXIValidation(squad);
        }
      });
      
      row.appendChild(num);
      row.appendChild(display);
      xiSlotsPane.appendChild(row);
    }

    document.querySelectorAll('.remove-player-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slot = e.target.getAttribute('data-slot');
        gameState.playingXI[slot] = null;
        renderXISquadCards(squad);
        updateXIValidation(squad);
      });
    });
  }
  
  if(xiBenchPane) {
    xiBenchPane.innerHTML = '';
    
    // Add dragover/drop to bench pane to remove from XI
    xiBenchPane.addEventListener('dragover', (e) => {
      e.preventDefault();
      xiBenchPane.classList.add('drag-over-bench');
    });
    xiBenchPane.addEventListener('dragleave', () => {
      xiBenchPane.classList.remove('drag-over-bench');
    });
    xiBenchPane.addEventListener('drop', (e) => {
      e.preventDefault();
      xiBenchPane.classList.remove('drag-over-bench');
      if (draggedPlayerId && draggedSourceSlot !== null) {
        // Player was dragged from a slot back to bench
        gameState.playingXI[draggedSourceSlot] = null;
        draggedPlayerId = null;
        draggedSourceSlot = null;
        removeHighlights();
        renderXISquadCards(squad);
        updateXIValidation(squad);
      }
    });
    
    // Header for coverage stats
    const coverageDiv = document.createElement('div');
    coverageDiv.className = 'coverage-stats';
    const top4 = squad.filter(p => p.idealBattingPos && (p.idealBattingPos.includes(1) || p.idealBattingPos.includes(2) || p.idealBattingPos.includes(3) || p.idealBattingPos.includes(4))).length;
    const finishers = squad.filter(p => p.idealBattingPos && (p.idealBattingPos.includes(5) || p.idealBattingPos.includes(6) || p.idealBattingPos.includes(7))).length;
    const ppBowlers = squad.filter(p => p.idealBowlingOvers && p.idealBowlingOvers.includes('1-6')).length;
    const deathBowlers = squad.filter(p => p.idealBowlingOvers && p.idealBowlingOvers.includes('16-20')).length;
    
    coverageDiv.innerHTML = `<div style="font-size:12px; margin-bottom:10px; padding:8px; background:rgba(0,0,0,0.4); border-radius:4px;">
      <strong style="color:var(--primary-gold)">Squad Coverage:</strong><br>
      Top Order (1-4): ${top4} | Finishers (5-7): ${finishers}<br>
      Powerplay Bowlers: ${ppBowlers} | Death Bowlers: ${deathBowlers}
    </div>`;
    xiBenchPane.appendChild(coverageDiv);

    squad.forEach(p => {
      if(!gameState.playingXI.includes(p.id)) {
        const benchDiv = document.createElement('div');
        benchDiv.className = 'xi-bench-player';
        benchDiv.draggable = true;
        
        let prefPos = p.idealBattingPos ? ` (${p.idealBattingPos.join(',')})` : '';
        let phase = p.idealBowlingOvers && p.idealBowlingOvers.length ? ` [${p.idealBowlingOvers.join(',')}]` : '';
        
        benchDiv.innerHTML = `
            <span>${p.name} ${p.isOverseas ? '✈️' : ''} ${p.trait ? '⭐' : ''}</span>
            <span class="bench-role">${p.role}${prefPos}${phase} OVR:${p.ovr}</span>
        `;
        
        benchDiv.addEventListener('dragstart', (e) => {
          draggedPlayerId = p.id;
          draggedSourceSlot = null;
          benchDiv.classList.add('dragging');
          highlightSlots(p);
        });
        
        benchDiv.addEventListener('dragend', () => {
          benchDiv.classList.remove('dragging');
          draggedPlayerId = null;
          removeHighlights();
        });

        xiBenchPane.appendChild(benchDiv);
      }
    });
  }
}

function autoSelectMyXI() {
  const myTeam = gameState.roomData.teams[gameState.selectedTeamId];
  if (!myTeam || !myTeam.squad) return;

  gameState.selectedXIIds.clear();

  // 1. Mandatory Wicketkeeper first
  const wk = myTeam.squad.find(p => p.role === "Wicketkeeper");
  let overseasCount = 0;
  if (wk) {
    gameState.selectedXIIds.add(wk.id);
    if (wk.isOverseas) overseasCount++;
  }

  // 2. Add highest OVR remaining players respecting max 4 overseas
  const sorted = [...myTeam.squad].sort((a, b) => b.ovr - a.ovr);
  for (const p of sorted) {
    if (gameState.selectedXIIds.size >= 11) break;
    if (gameState.selectedXIIds.has(p.id)) continue;
    if (p.isOverseas && overseasCount >= 4) continue;

    gameState.selectedXIIds.add(p.id);
    if (p.isOverseas) overseasCount++;
  }

  renderXISquadCards(myTeam.squad);
  updateXIValidation(myTeam.squad);
}

function updateXIValidation(squad) {
  const selectedPlayers = squad.filter(p => gameState.selectedXIIds.has(p.id));
  const count = selectedPlayers.length;
  const wkCount = selectedPlayers.filter(p => p.role === "Wicketkeeper").length;
  const overseasCount = selectedPlayers.filter(p => p.isOverseas).length;

  pillSelectedCount.innerHTML = `Selected: <strong>${count} / 11</strong>`;
  pillWkCount.innerHTML = `Wicketkeepers: <strong>${wkCount} (Min 1)</strong>`;
  pillOverseasCount.innerHTML = `Overseas: <strong>${overseasCount} / 4</strong>`;

  let valid = true;
  let msg = "";

  if (count !== 11) {
    valid = false;
    msg = `⚠️ Select exactly 11 players (${count}/11).`;
  } else if (wkCount < 1) {
    valid = false;
    msg = `⚠️ Must have at least 1 Wicketkeeper (🧤) in Playing XI!`;
  } else if (overseasCount > 4) {
    valid = false;
    msg = `⚠️ Maximum 4 Overseas players allowed (${overseasCount}/4).`;
  } else {
    msg = "✅ Playing XI is valid and ready!";
  }

  xiValidationMsg.textContent = msg;
  xiValidationMsg.style.color = valid ? "var(--accent-green)" : "var(--accent-red)";
  btnLockPlayingXI.disabled = !valid;
}

function submitMyPlayingXI() {
  const playerIds = Array.from(gameState.selectedXIIds);
  btnLockPlayingXI.disabled = true;
  btnLockPlayingXI.textContent = "WAITING FOR SIMULATION...";

  socket.emit('submit_playing_xi', {
    roomCode: gameState.roomCode,
    teamId: gameState.selectedTeamId,
    playerIds: playerIds
  }, (res) => {
    if (!res.success) {
      alert(res.message);
      btnLockPlayingXI.disabled = false;
      btnLockPlayingXI.textContent = "CONFIRM PLAYING XI & SIMULATE 🏏";
    }
  });
}

function renderSeasonResults(simResult, roomState) {
  showScreen(screenSeason);
  AudioFX.cheer();

  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }

  const champion = simResult.champion;
  document.getElementById('championName').textContent = champion.name.toUpperCase();
  document.getElementById('championManager').textContent = `Managed by ${champion.owner} • Overall Squad Rating: ${champion.rating}/100`;

  const tbody = document.getElementById('standingsTableBody');
  tbody.innerHTML = '';

  simResult.standings.forEach(t => {
    const tr = document.createElement('tr');
    if (t.id === gameState.selectedTeamId) {
      tr.style.backgroundColor = 'rgba(249, 178, 51, 0.08)';
    }

    tr.innerHTML = `
      <td><span class="rank-badge rank-${t.rank}">${t.rank}</span></td>
      <td>
        <div class="team-cell">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${t.primaryColor}"></span>
          <strong>${t.name}</strong>
        </div>
      </td>
      <td>${t.owner} ${t.isHuman ? '⭐' : ''}</td>
      <td>${t.played}</td>
      <td><strong style="color:var(--accent-green)">${t.won}</strong></td>
      <td><strong style="color:var(--accent-red)">${t.lost}</strong></td>
      <td>${t.nrr > 0 ? `+${t.nrr}` : t.nrr}</td>
      <td><strong style="color:var(--primary-gold); font-size:16px;">${t.points}</strong></td>
      <td><strong>${t.rating}</strong> (Bat: ${t.avgBat} / Bowl: ${t.avgBowl})</td>
      <td><span style="font-size:11px;color:var(--text-secondary);">${t.playingXI.slice(0, 3).map(p => p.trait).join(', ')}...</span></td>
    `;
    tbody.appendChild(tr);
  });

  const bracket = document.getElementById('playoffsBracket');
  bracket.innerHTML = '';

  const po = simResult.playoffs;
  const playoffMatches = [
    { title: "Qualifier 1 (Top 2)", data: po.qualifier1 },
    { title: "Eliminator (3rd vs 4th)", data: po.eliminator },
    { title: "Qualifier 2", data: po.qualifier2 },
    { title: "IPL Grand Final 🏆", data: po.grandFinal, isFinal: true }
  ];

  playoffMatches.forEach(m => {
    const match = m.data.match;
    const card = document.createElement('div');
    card.className = 'playoff-match-card';
    if (m.isFinal) card.style.borderColor = 'var(--primary-gold)';

    card.innerHTML = `
      <div class="playoff-stage-title">${m.title}</div>
      <div class="match-scores-wrap">
        <div class="match-team-row ${match.winnerName === match.teamA ? 'winner' : ''}">
          <span>${match.teamA}</span>
          <span>${match.scoreA}/${match.wicketsA} (${match.oversA} ov)</span>
        </div>
        <div class="match-team-row ${match.winnerName === match.teamB ? 'winner' : ''}">
          <span>${match.teamB}</span>
          <span>${match.scoreB}/${match.wicketsB} (${match.oversB} ov)</span>
        </div>
      </div>
      <div class="match-highlight-note">
        <strong>Winner: ${m.data.winner}</strong> • ${match.highlight}
      </div>
    `;
    bracket.appendChild(card);
  });

  const squadsGrid = document.getElementById('allSquadsGrid');
  squadsGrid.innerHTML = '';

  simResult.standings.forEach(t => {
    const card = document.createElement('div');
    card.className = 'squad-breakdown-card';
    card.innerHTML = `
      <div class="sbc-header">
        <div class="sbc-team-name" style="color: ${t.primaryColor}">${t.name} (Rank #${t.rank})</div>
        <div class="sbc-rating">OVR: ${t.rating}</div>
      </div>
      <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
        Batting: ${t.avgBat} | Bowling: ${t.avgBowl} | Manager: ${t.owner}
      </div>
      <div class="sbc-xi-list">
        ${t.playingXI.map((p, idx) => `
          <div class="sbc-player-item">
            <span><strong>${idx + 1}. ${p.name}</strong> ${p.role === 'Wicketkeeper' ? '🧤' : ''} <span class="trait-tag-micro">[${p.trait}]</span></span>
            <span style="color:var(--primary-gold)">OVR: ${p.ovr}</span>
          </div>
        `).join('')}
      </div>
    `;
    squadsGrid.appendChild(card);
  });
}

// REALTIME SOCKET LISTENERS
socket.on('room_updated', (roomState) => {
  gameState.roomData = roomState;
  renderLobbyTeams(roomState.teams);
  if (roomState.status === 'auction') {
    renderAuctionStage(roomState.currentPlayer, roomState);
  }
});

socket.on('player_announced', ({ player, announcement, roomState }) => {
  gameState.roomData = roomState;
  renderAuctionStage(player, roomState);
  addLog(announcement, 'normal');
});

socket.on('timer_tick', ({ timeLeft, currentBid, currentBidder, currentBidderName }) => {
  timerClock.textContent = `${timeLeft}s`;
  if (timeLeft <= 3) {
    timerClock.classList.add('urgent');
    AudioFX.tick();
  } else {
    timerClock.classList.remove('urgent');
  }

  if (gameState.roomData && gameState.roomData.currentPlayer) {
    gameState.roomData.currentPlayer.currentBid = currentBid;
    gameState.roomData.currentPlayer.currentBidder = currentBidder;
    gameState.roomData.currentPlayer.currentBidderName = currentBidderName;
    updateBidConsole(gameState.roomData.currentPlayer, gameState.roomData);
  }
});

socket.on('bid_placed', ({ player, bidLog, teamId, roomState }) => {
  gameState.roomData = roomState;
  renderAuctionStage(player, roomState);
  addLog(bidLog, 'bid');
  AudioFX.bid();
});

socket.on('player_sold', ({ player, team, hammerLog, roomState }) => {
  gameState.roomData = roomState;
  addLog(hammerLog, 'sold');
  AudioFX.hammer();
  renderAuctionStage(player, roomState);
});

socket.on('player_unsold', ({ player, unsoldLog, roomState }) => {
  gameState.roomData = roomState;
  addLog(unsoldLog, 'unsold');
  AudioFX.hammer();
  renderAuctionStage(player, roomState);
});

socket.on('start_xi_selection', ({ roomState }) => {
  gameState.roomData = roomState;
  showPlayingXISelection(roomState);
});

socket.on('team_xi_updated', ({ teamId, teamName, roomState }) => {
  gameState.roomData = roomState;
  addLog(`${teamName} locked in their Playing XI!`, 'normal');
});

socket.on('season_completed', ({ simulationResult, roomState }) => {
  gameState.roomData = roomState;
  renderSeasonResults(simulationResult, roomState);
});
