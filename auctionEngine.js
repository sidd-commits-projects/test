// Auction Engine & Season Simulation Logic
const { IPL_TEAMS, PLAYER_TEMPLATES } = require('./playersData');

// Clone and shuffle players for auction pool with slight randomized traits/stats
function generatePlayerPool(count = 65) {
  const shuffled = [...PLAYER_TEMPLATES].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((p, idx) => {
    const batVar = Math.floor(Math.random() * 5) - 2;
    const bowlVar = Math.floor(Math.random() * 5) - 2;
    const finalBat = Math.min(99, Math.max(10, p.bat + batVar));
    const finalBowl = Math.min(99, Math.max(10, p.bowl + bowlVar));
    const finalOvr = Math.round((finalBat * (p.role.includes("Batsman") || p.role === "Wicketkeeper" ? 0.7 : p.role.includes("Bowler") ? 0.3 : 0.5)) + 
                                (finalBowl * (p.role.includes("Bowler") ? 0.7 : (p.role.includes("Batsman") || p.role === "Wicketkeeper") ? 0.3 : 0.5)));

    return {
      id: `p_${idx + 1}`,
      name: p.name,
      country: p.country,
      isOverseas: p.country !== "IND",
      role: p.role,
      bat: finalBat,
      bowl: finalBowl,
      ovr: finalOvr,
      basePrice: p.basePrice,
      currentBid: 0,
      currentBidder: null,
      status: "upcoming",
      soldTo: null,
      soldPrice: 0,
      trait: p.trait
    };
  });
}

function getNextBidIncrement(currentPrice) {
  if (currentPrice < 1.0) return 0.10;
  if (currentPrice < 2.0) return 0.20;
  if (currentPrice < 5.0) return 0.25;
  return 0.50;
}

function canTeamBid(team, bidAmount, isOverseas) {
  const maxSquad = 18;
  const maxOverseas = 7;
  const minRequiredSquad = 11;
  const minReservePerSlot = 0.20;

  if (team.squad.length >= maxSquad) {
    return { allowed: false, reason: "Squad limit of 18 players reached." };
  }

  const overseasCount = team.squad.filter(p => p.isOverseas).length;
  if (isOverseas && overseasCount >= maxOverseas) {
    return { allowed: false, reason: "Overseas limit of 7 players reached." };
  }

  const remainingBudget = team.purse - bidAmount;
  const remainingSlotsNeededFor11 = Math.max(0, minRequiredSquad - (team.squad.length + 1));
  const reserveNeeded = remainingSlotsNeededFor11 * minReservePerSlot;

  if (remainingBudget < reserveNeeded) {
    return { allowed: false, reason: `Insufficient purse! Need ₹${reserveNeeded.toFixed(2)} Cr reserve to complete squad.` };
  }

  return { allowed: true };
}

function evaluateBotInterest(botTeam, player, currentBid) {
  const eligibility = canTeamBid(botTeam, currentBid, player.isOverseas);
  if (!eligibility.allowed) return false;

  const roles = {
    "Batsman": botTeam.squad.filter(p => p.role === "Batsman").length,
    "Wicketkeeper": botTeam.squad.filter(p => p.role === "Wicketkeeper").length,
    "Fast Bowler": botTeam.squad.filter(p => p.role === "Fast Bowler").length,
    "Spinner": botTeam.squad.filter(p => p.role === "Spinner").length,
    "Fast Bowling Allrounder": botTeam.squad.filter(p => p.role === "Fast Bowling Allrounder").length,
    "Spin Bowling Allrounder": botTeam.squad.filter(p => p.role === "Spin Bowling Allrounder").length,
    "Medium Pace Bowler": botTeam.squad.filter(p => p.role === "Medium Pace Bowler").length
  };

  let roleNeedWeight = 1.0;
  // If team has no wicketkeeper, heavily prioritize bidding on one!
  if (player.role === "Wicketkeeper") {
    if (roles["Wicketkeeper"] === 0) roleNeedWeight = 2.0;
    else roleNeedWeight = 0.7;
  } else if (player.role === "Batsman" && roles["Batsman"] < 4) roleNeedWeight = 1.35;
  else if (player.role === "Fast Bowler" && roles["Fast Bowler"] < 3) roleNeedWeight = 1.45;
  else if (player.role === "Spinner" && roles["Spinner"] < 2) roleNeedWeight = 1.4;
  else if (player.role.includes("Allrounder") && (roles["Fast Bowling Allrounder"] + roles["Spin Bowling Allrounder"]) < 3) roleNeedWeight = 1.4;
  else if (botTeam.squad.length > 14) roleNeedWeight = 0.6;

  let maxWillingToPay = player.basePrice;
  if (player.ovr >= 95) maxWillingToPay = 16.0 + (player.ovr - 95) * 2.5;
  else if (player.ovr >= 90) maxWillingToPay = 9.0 + (player.ovr - 90) * 1.4;
  else if (player.ovr >= 85) maxWillingToPay = 4.5 + (player.ovr - 85) * 0.9;
  else maxWillingToPay = 1.5 + (player.ovr - 75) * 0.3;

  maxWillingToPay *= roleNeedWeight;

  const purseFactor = Math.max(0.4, botTeam.purse / 100.0);
  maxWillingToPay *= purseFactor;

  const personality = 0.85 + Math.random() * 0.3;
  maxWillingToPay *= personality;

  const hardCap = botTeam.purse * 0.45;
  maxWillingToPay = Math.min(maxWillingToPay, hardCap);

  return currentBid <= maxWillingToPay;
}

// Auto-select playing XI for a team (incorporating 1 mandatory WK and max 4 overseas)
function autoSelectPlayingXI(squad) {
  const sorted = [...squad].sort((a, b) => b.ovr - a.ovr);
  let xi = [];
  let overseasCount = 0;

  // 1. Mandatory Wicketkeeper first
  const wk = sorted.find(p => p.role === "Wicketkeeper");
  if (wk) {
    xi.push(wk);
    if (wk.isOverseas) overseasCount++;
  }

  // 2. Add remaining top players respecting max 4 overseas
  for (const p of sorted) {
    if (xi.length >= 11) break;
    if (xi.some(x => x.id === p.id)) continue;
    if (p.isOverseas && overseasCount >= 4) continue;

    xi.push(p);
    if (p.isOverseas) overseasCount++;
  }

  return xi;
}

// Validate custom selected playing XI:
// - Must be exactly 11 players
// - Must have at least 1 Wicketkeeper
// - Maximum 4 overseas players
function validatePlayingXI(xi) {
  if (!Array.isArray(xi) || xi.length !== 11) {
    return { valid: false, reason: "Playing XI must have exactly 11 players." };
  }

  const wkCount = xi.filter(p => p.role === "Wicketkeeper").length;
  if (wkCount < 1) {
    return { valid: false, reason: "Playing XI MUST include at least 1 Wicketkeeper!" };
  }

  const overseasCount = xi.filter(p => p.isOverseas).length;
  if (overseasCount > 4) {
    return { valid: false, reason: `Maximum 4 overseas players allowed in Playing XI (currently has ${overseasCount}).` };
  }

  return { valid: true };
}

// Season Simulation Engine
function simulateSeason(teams) {
  const teamsWithXI = teams.map(t => {
    // If user has chosen a custom playing XI and it is valid, use it; otherwise auto-select
    let xi = (t.customPlayingXI && t.customPlayingXI.length === 11) 
      ? t.customPlayingXI 
      : autoSelectPlayingXI(t.squad);

    let totalBat = 0;
    let totalBowl = 0;
    let traits = [];

    xi.forEach(p => {
      totalBat += p.bat;
      totalBowl += p.bowl;
      if (p.trait) traits.push(p.trait);
    });

    const avgBat = xi.length > 0 ? (totalBat / xi.length) : 50;
    const avgBowl = xi.length > 0 ? (totalBowl / xi.length) : 50;

    const squadDeficitPenalty = Math.max(0, 11 - t.squad.length) * 15;

    // Trait combos & bonuses
    let traitBonus = 0;
    if (traits.includes("Finisher") && traits.includes("Chase Master")) traitBonus += 4;
    if (traits.includes("Yorker King") && traits.includes("Mystery Spinner")) traitBonus += 4;
    if (traits.includes("Jack of All Trades")) traitBonus += 2.5;
    if (traits.includes("Captain Cool")) traitBonus += 3;
    if (traits.includes("Powerplay Destroyer")) traitBonus += 2.5;
    if (traits.includes("Lightning Gloves")) traitBonus += 2;

    const overallRating = Math.max(30, Math.round(((avgBat * 0.5) + (avgBowl * 0.5) + traitBonus) - squadDeficitPenalty));

    return {
      ...t,
      playingXI: xi,
      avgBat: Math.round(avgBat),
      avgBowl: Math.round(avgBowl),
      traitBonus: Math.round(traitBonus),
      overallRating,
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      points: 0,
      nrr: 0.0,
      runsScored: 0,
      oversFaced: 0,
      runsConceded: 0,
      oversBowled: 0,
      matchLog: []
    };
  });

  const matchResults = [];

  for (let i = 0; i < teamsWithXI.length; i++) {
    for (let j = i + 1; j < teamsWithXI.length; j++) {
      const teamA = teamsWithXI[i];
      const teamB = teamsWithXI[j];

      const result = simulateMatch(teamA, teamB);
      matchResults.push(result);

      teamA.played++;
      teamB.played++;

      teamA.runsScored += result.scoreA;
      teamA.oversFaced += result.oversA;
      teamA.runsConceded += result.scoreB;
      teamA.oversBowled += result.oversB;

      teamB.runsScored += result.scoreB;
      teamB.oversFaced += result.oversB;
      teamB.runsConceded += result.scoreA;
      teamB.oversBowled += result.oversA;

      if (result.winnerId === teamA.id) {
        teamA.won++;
        teamA.points += 2;
        teamB.lost++;
      } else {
        teamB.won++;
        teamB.points += 2;
        teamA.lost++;
      }

      teamA.matchLog.push({ vs: teamB.name, won: result.winnerId === teamA.id, score: `${result.scoreA}/${result.wicketsA} vs ${result.scoreB}/${result.wicketsB}`, highlight: result.highlight });
      teamB.matchLog.push({ vs: teamA.name, won: result.winnerId === teamB.id, score: `${result.scoreB}/${result.wicketsB} vs ${result.scoreA}/${result.wicketsA}`, highlight: result.highlight });
    }
  }

  teamsWithXI.forEach(t => {
    const batRate = t.oversFaced > 0 ? (t.runsScored / t.oversFaced) : 0;
    const bowlRate = t.oversBowled > 0 ? (t.runsConceded / t.oversBowled) : 0;
    t.nrr = +(batRate - bowlRate).toFixed(3);
  });

  teamsWithXI.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.nrr !== a.nrr) return b.nrr - a.nrr;
    return b.overallRating - a.overallRating;
  });

  const top4 = teamsWithXI.slice(0, 4);
  const q1 = simulateMatch(top4[0], top4[1], "Qualifier 1");
  const q1Winner = q1.winnerId === top4[0].id ? top4[0] : top4[1];
  const q1Loser = q1.winnerId === top4[0].id ? top4[1] : top4[0];

  const elim = simulateMatch(top4[2], top4[3], "Eliminator");
  const elimWinner = elim.winnerId === top4[2].id ? top4[2] : top4[3];

  const q2 = simulateMatch(q1Loser, elimWinner, "Qualifier 2");
  const q2Winner = q2.winnerId === q1Loser.id ? q1Loser : elimWinner;

  const finalMatch = simulateMatch(q1Winner, q2Winner, "Grand Final");
  const champion = finalMatch.winnerId === q1Winner.id ? q1Winner : q2Winner;
  const runnerUp = champion.id === q1Winner.id ? q2Winner : q1Winner;

  return {
    standings: teamsWithXI.map((t, idx) => ({
      rank: idx + 1,
      id: t.id,
      name: t.name,
      owner: t.owner,
      isHuman: t.isHuman,
      played: t.played,
      won: t.won,
      lost: t.lost,
      points: t.points,
      nrr: t.nrr,
      rating: t.overallRating,
      avgBat: t.avgBat,
      avgBowl: t.avgBowl,
      squadCount: t.squad.length,
      primaryColor: t.primaryColor,
      playingXI: t.playingXI,
      recentMatches: t.matchLog.slice(-5)
    })),
    playoffs: {
      qualifier1: { match: q1, winner: q1Winner.name },
      eliminator: { match: elim, winner: elimWinner.name },
      qualifier2: { match: q2, winner: q2Winner.name },
      grandFinal: { match: finalMatch, winner: champion.name, championId: champion.id, runnerUp: runnerUp.name }
    },
    champion: {
      id: champion.id,
      name: champion.name,
      owner: champion.owner,
      isHuman: champion.isHuman,
      rating: champion.overallRating
    }
  };
}

function simulateMatch(teamA, teamB, stage = "League") {
  const ratA = teamA.overallRating || 70;
  const ratB = teamB.overallRating || 70;

  const diff = ratA - ratB;
  const winProbA = 1 / (1 + Math.pow(10, -diff / 40));

  const aWins = Math.random() < winProbA;

  const baseScoreA = Math.round(135 + (teamA.avgBat * 0.6) + (Math.random() * 40 - 20));
  const baseScoreB = Math.round(135 + (teamB.avgBat * 0.6) + (Math.random() * 40 - 20));

  let scoreA, scoreB, wicketsA, wicketsB, oversA = 20.0, oversB = 20.0;
  let highlight = "";

  if (aWins) {
    scoreA = Math.max(140, baseScoreA + 10);
    scoreB = Math.min(scoreA - (Math.floor(Math.random() * 25) + 3), Math.max(110, baseScoreB));
    wicketsA = Math.floor(Math.random() * 6) + 3;
    wicketsB = Math.min(10, Math.floor(Math.random() * 5) + 6);
    highlight = `${teamA.name} defended well against ${teamB.name}`;
  } else {
    scoreB = Math.max(140, baseScoreB + 10);
    scoreA = Math.min(scoreB - (Math.floor(Math.random() * 25) + 3), Math.max(110, baseScoreA));
    wicketsB = Math.floor(Math.random() * 6) + 3;
    wicketsA = Math.min(10, Math.floor(Math.random() * 5) + 6);
    highlight = `${teamB.name} chased down total with ease`;
  }

  const winnerId = aWins ? teamA.id : teamB.id;
  const winnerName = aWins ? teamA.name : teamB.name;

  return {
    stage,
    teamA: teamA.name,
    teamB: teamB.name,
    scoreA,
    wicketsA,
    oversA,
    scoreB,
    wicketsB,
    oversB,
    winnerId,
    winnerName,
    highlight: `${stage}: ${winnerName} won (${scoreA}/${wicketsA} vs ${scoreB}/${wicketsB})`
  };
}

module.exports = {
  generatePlayerPool,
  getNextBidIncrement,
  canTeamBid,
  evaluateBotInterest,
  autoSelectPlayingXI,
  validatePlayingXI,
  simulateSeason
};
