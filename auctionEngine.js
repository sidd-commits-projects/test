// Auction Engine & Season Simulation Logic
const { IPL_TEAMS, PLAYER_TEMPLATES } = require('./playersData');

function generatePlayerPool(count = 190) {
  const shuffled = [...PLAYER_TEMPLATES].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((p, idx) => {
    const batVar = Math.floor(Math.random() * 5) - 2;
    const bowlVar = Math.floor(Math.random() * 5) - 2;
    const finalBat = Math.min(99, Math.max(10, p.bat + batVar));
    const finalBowl = Math.min(99, Math.max(10, p.bowl + bowlVar));

    let finalOvr;
    if (p.role === 'Batsman' || p.role === 'Wicketkeeper') {
      finalOvr = Math.round(finalBat * 0.85 + finalBowl * 0.15);
    } else if (p.role.includes('Bowler') || p.role === 'Spinner') {
      finalOvr = Math.round(finalBat * 0.15 + finalBowl * 0.85);
    } else {
      finalOvr = Math.round((finalBat + finalBowl) / 2);
    }

    return {
      id: `p_${idx + 1}`,
      name: p.name,
      country: p.country,
      isOverseas: p.country !== 'IND',
      role: p.role,
      bat: finalBat,
      bowl: finalBowl,
      ovr: finalOvr,
      basePrice: p.basePrice,
      currentBid: 0,
      currentBidder: null,
      status: 'upcoming',
      soldTo: null,
      soldPrice: 0,
      trait: p.trait,
      idealBattingPos: p.idealBattingPos || [],
      idealBowlingOvers: p.idealBowlingOvers || []
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
  const maxSquad = 25;
  const maxOverseas = 8; // Increased from 7 to allow more flexibility, as long as we have 7 Indians
  const minRequiredSquad = 11;
  const minReservePerSlot = 0.20;
  const minIndiansRequired = 7;

  if (team.squad.length >= maxSquad) {
    return { allowed: false, reason: 'Squad limit of 15 players reached.' };
  }
  const overseasCount = team.squad.filter(p => p.isOverseas).length;
  if (isOverseas) {
    if (overseasCount >= maxOverseas) {
      return { allowed: false, reason: 'Overseas limit of ' + maxOverseas + ' players reached.' };
    }
    const currentIndians = team.squad.filter(p => !p.isOverseas).length;
    const remainingSlotsAfterThis = maxSquad - (team.squad.length + 1);
    if (currentIndians + remainingSlotsAfterThis < minIndiansRequired) {
      return { allowed: false, reason: 'Must reserve remaining slots to meet the minimum 7 Indian players requirement.' };
    }
  }
  const remainingBudget = team.purse - bidAmount;
  const remainingSlotsNeededFor11 = Math.max(0, minRequiredSquad - (team.squad.length + 1));
  const reserveNeeded = remainingSlotsNeededFor11 * minReservePerSlot;
  if (remainingBudget < reserveNeeded) {
    return { allowed: false, reason: 'Insufficient purse! Need reserve to complete squad.' };
  }
  return { allowed: true };
}

function isPureBowler(p) {
  return p.role === 'Fast Bowler' || p.role === 'Spinner' || p.role === 'Medium Pace Bowler';
}

function isPureBatter(p) {
  return p.role === 'Batsman' || p.role === 'Wicketkeeper';
}

function canBowl(p) {
  return isPureBowler(p) || p.role === 'Fast Bowling Allrounder' || p.role === 'Spin Bowling Allrounder';
}

function isBatter(p) {
  return isPureBatter(p) || p.role === 'Fast Bowling Allrounder' || p.role === 'Spin Bowling Allrounder';
}

// Calculate batting penalty for being out of ideal position
function getBattingPositionPenalty(player, slotPosition) {
  if (!player.idealBattingPos || player.idealBattingPos.length === 0) return 0;
  var minDiff = Math.min.apply(null, player.idealBattingPos.map(function(pos) { return Math.abs(pos - slotPosition); }));
  if (minDiff === 0) return 0;
  if (minDiff === 1) return 3;
  if (minDiff === 2) return 8;
  if (minDiff === 3) return 15;
  return 20 + (minDiff - 3) * 5;
}

// Calculate bowling penalty for bowling out of comfortable phase
function getBowlingPhasePenalty(player, phase) {
  if (!player.idealBowlingOvers || player.idealBowlingOvers.length === 0) {
    if (!canBowl(player)) return 30;
    return 10;
  }
  if (player.idealBowlingOvers.includes(phase)) return 0;
  return 12;
}

function evaluateBotInterest(botTeam, player, currentBid) {
  var eligibility = canTeamBid(botTeam, currentBid, player.isOverseas);
  if (!eligibility.allowed) return false;

  var roles = {};
  ['Batsman', 'Wicketkeeper', 'Fast Bowler', 'Spinner', 'Fast Bowling Allrounder', 'Spin Bowling Allrounder', 'Medium Pace Bowler'].forEach(function(r) {
    roles[r] = botTeam.squad.filter(function(p) { return p.role === r; }).length;
  });

  var bowlerCount = roles['Fast Bowler'] + roles['Spinner'] + roles['Medium Pace Bowler'] +
                    roles['Fast Bowling Allrounder'] + roles['Spin Bowling Allrounder'];

  var roleNeedWeight = 1.0;
  if (player.role === 'Wicketkeeper') {
    roleNeedWeight = roles['Wicketkeeper'] === 0 ? 2.5 : roles['Wicketkeeper'] === 1 ? 0.8 : 0.4;
  } else if (player.role === 'Batsman') {
    roleNeedWeight = roles['Batsman'] < 4 ? 1.35 : 0.7;
  } else if (player.role === 'Fast Bowler') {
    roleNeedWeight = bowlerCount < 5 ? 1.6 : roles['Fast Bowler'] < 3 ? 1.3 : 0.7;
  } else if (player.role === 'Spinner') {
    roleNeedWeight = bowlerCount < 5 ? 1.5 : roles['Spinner'] < 2 ? 1.3 : 0.7;
  } else if (player.role === 'Medium Pace Bowler') {
    roleNeedWeight = bowlerCount < 5 ? 1.4 : 0.7;
  } else if (player.role.includes('Allrounder')) {
    roleNeedWeight = (roles['Fast Bowling Allrounder'] + roles['Spin Bowling Allrounder']) < 3 ? 1.4 : 0.7;
  }
  if (botTeam.squad.length > 12) roleNeedWeight *= 0.6;

  var maxWillingToPay = player.basePrice;
  if (player.ovr >= 95) maxWillingToPay = 16.0 + (player.ovr - 95) * 2.5;
  else if (player.ovr >= 90) maxWillingToPay = 9.0 + (player.ovr - 90) * 1.4;
  else if (player.ovr >= 85) maxWillingToPay = 4.5 + (player.ovr - 85) * 0.9;
  else maxWillingToPay = 1.5 + Math.max(0, player.ovr - 75) * 0.3;

  maxWillingToPay *= roleNeedWeight;
  maxWillingToPay *= Math.max(0.4, botTeam.purse / 100.0);
  maxWillingToPay *= (0.85 + Math.random() * 0.3);
  maxWillingToPay = Math.min(maxWillingToPay, botTeam.purse * 0.45);

  return currentBid <= maxWillingToPay;
}

function autoSelectPlayingXI(squad) {
  var sorted = squad.slice().sort(function(a, b) { return b.ovr - a.ovr; });
  var xi = [];
  var overseasCount = 0;
  var usedIds = {};

  var wk = sorted.find(function(p) { return p.role === 'Wicketkeeper'; });
  if (wk) {
    xi.push(wk);
    usedIds[wk.id] = true;
    if (wk.isOverseas) overseasCount++;
  }

  var bowlers = sorted.filter(function(p) { return canBowl(p) && !usedIds[p.id]; });
  var bowlersInXI = xi.filter(function(p) { return canBowl(p); }).length;
  for (var b = 0; b < bowlers.length; b++) {
    if (bowlersInXI >= 5 || xi.length >= 11) break;
    var p = bowlers[b];
    if (p.isOverseas && overseasCount >= 4) continue;
    xi.push(p);
    usedIds[p.id] = true;
    if (p.isOverseas) overseasCount++;
    bowlersInXI++;
  }

  for (var s = 0; s < sorted.length; s++) {
    if (xi.length >= 11) break;
    var pl = sorted[s];
    if (usedIds[pl.id]) continue;
    if (pl.isOverseas && overseasCount >= 4) continue;
    xi.push(pl);
    usedIds[pl.id] = true;
    if (pl.isOverseas) overseasCount++;
  }

  return xi;
}

function validatePlayingXI(xi) {
  if (!Array.isArray(xi) || xi.length !== 11) {
    return { valid: false, reason: 'Playing XI must have exactly 11 players.' };
  }
  var wkCount = xi.filter(function(p) { return p.role === 'Wicketkeeper'; }).length;
  if (wkCount < 1) {
    return { valid: false, reason: 'Playing XI MUST include at least 1 Wicketkeeper!' };
  }
  var overseasCount = xi.filter(function(p) { return p.isOverseas; }).length;
  if (overseasCount > 4) {
    return { valid: false, reason: 'Maximum 4 overseas players allowed in Playing XI.' };
  }
  return { valid: true };
}

function calculateTeamRatings(xi) {
  var totalBat = 0, batCount = 0;
  var totalBowl = 0, bowlCount = 0;
  var traits = [];

  xi.forEach(function(p, idx) {
    if (!p) return;
    var slotPosition = idx + 1;

    var batPenalty = getBattingPositionPenalty(p, slotPosition);
    var effectiveBat = Math.max(10, p.bat - batPenalty);

    if (isBatter(p)) {
      totalBat += effectiveBat;
      batCount++;
    }

    if (canBowl(p)) {
      var bowlPenalty = 0;
      var phases = ['1-6', '7-15', '16-20'];
      phases.forEach(function(phase) {
        bowlPenalty += getBowlingPhasePenalty(p, phase);
      });
      bowlPenalty = Math.round(bowlPenalty / 3);
      var effectiveBowl = Math.max(10, p.bowl - bowlPenalty);
      totalBowl += effectiveBowl;
      bowlCount++;
    }

    if (p.trait) traits.push(p.trait);
  });

  var avgBat = batCount > 0 ? Math.round(totalBat / batCount) : 30;
  var avgBowl = bowlCount > 0 ? Math.round(totalBowl / bowlCount) : 30;

  var traitBonus = 0;
  if (traits.some(function(t) { return t.includes('Finisher'); }) && traits.some(function(t) { return t.includes('Chase Master'); })) traitBonus += 4;
  if (traits.some(function(t) { return t.includes('Yorker King'); }) && traits.some(function(t) { return t.includes('Mystery Spinner'); })) traitBonus += 4;
  if (traits.some(function(t) { return t.includes('Jack of All Trades'); })) traitBonus += 2.5;
  if (traits.some(function(t) { return t.includes('Captain Cool'); })) traitBonus += 3;
  if (traits.some(function(t) { return t.includes('Powerplay Destroyer'); })) traitBonus += 2.5;
  if (traits.some(function(t) { return t.includes('Lightning Gloves'); })) traitBonus += 2;

  var finalBat = Math.max(30, avgBat + Math.round(traitBonus));
  var finalBowl = Math.max(30, avgBowl + Math.round(traitBonus));
  var overallRating = Math.round((finalBat + finalBowl) / 2);

  return { avgBat: finalBat, avgBowl: finalBowl, overallRating: overallRating, traitBonus: Math.round(traitBonus) };
}

function simulateSeason(teams) {
  var teamsWithXI = teams.map(function(t) {
    var xi = (t.customPlayingXI && t.customPlayingXI.length === 11)
      ? t.customPlayingXI
      : autoSelectPlayingXI(t.squad);

    var ratings = calculateTeamRatings(xi);

    return Object.assign({}, t, {
      playingXI: xi,
      avgBat: ratings.avgBat,
      avgBowl: ratings.avgBowl,
      traitBonus: ratings.traitBonus,
      overallRating: ratings.overallRating,
      played: 0, won: 0, lost: 0, tied: 0, points: 0, nrr: 0.0,
      runsScored: 0, oversFaced: 0, runsConceded: 0, oversBowled: 0,
      matchLog: []
    });
  });

  for (var i = 0; i < teamsWithXI.length; i++) {
    for (var j = i + 1; j < teamsWithXI.length; j++) {
      var teamA = teamsWithXI[i];
      var teamB = teamsWithXI[j];
      var result = simulateMatch(teamA, teamB);

      teamA.played++; teamB.played++;
      teamA.runsScored += result.scoreA; teamA.oversFaced += result.oversA;
      teamA.runsConceded += result.scoreB; teamA.oversBowled += result.oversB;
      teamB.runsScored += result.scoreB; teamB.oversFaced += result.oversB;
      teamB.runsConceded += result.scoreA; teamB.oversBowled += result.oversA;

      if (result.winnerId === teamA.id) { teamA.won++; teamA.points += 2; teamB.lost++; }
      else { teamB.won++; teamB.points += 2; teamA.lost++; }

      teamA.matchLog.push({ vs: teamB.name, won: result.winnerId === teamA.id, score: result.scoreA + '/' + result.wicketsA + ' vs ' + result.scoreB + '/' + result.wicketsB, highlight: result.highlight });
      teamB.matchLog.push({ vs: teamA.name, won: result.winnerId === teamB.id, score: result.scoreB + '/' + result.wicketsB + ' vs ' + result.scoreA + '/' + result.wicketsA, highlight: result.highlight });
    }
  }

  teamsWithXI.forEach(function(t) {
    var batRate = t.oversFaced > 0 ? (t.runsScored / t.oversFaced) : 0;
    var bowlRate = t.oversBowled > 0 ? (t.runsConceded / t.oversBowled) : 0;
    t.nrr = +(batRate - bowlRate).toFixed(3);
  });

  teamsWithXI.sort(function(a, b) {
    if (b.points !== a.points) return b.points - a.points;
    if (b.nrr !== a.nrr) return b.nrr - a.nrr;
    return b.overallRating - a.overallRating;
  });

  var top4 = teamsWithXI.slice(0, 4);
  var q1 = simulateMatch(top4[0], top4[1], 'Qualifier 1');
  var q1Winner = q1.winnerId === top4[0].id ? top4[0] : top4[1];
  var q1Loser = q1.winnerId === top4[0].id ? top4[1] : top4[0];
  var elim = simulateMatch(top4[2], top4[3], 'Eliminator');
  var elimWinner = elim.winnerId === top4[2].id ? top4[2] : top4[3];
  var q2 = simulateMatch(q1Loser, elimWinner, 'Qualifier 2');
  var q2Winner = q2.winnerId === q1Loser.id ? q1Loser : elimWinner;
  var finalMatch = simulateMatch(q1Winner, q2Winner, 'Grand Final');
  var champion = finalMatch.winnerId === q1Winner.id ? q1Winner : q2Winner;
  var runnerUp = champion.id === q1Winner.id ? q2Winner : q1Winner;

  var allPlayers = [];
  teamsWithXI.forEach(function(t) {
    var matchesPlayed = t.played + (top4.includes(t) ? (champion.id === t.id ? 2 : 1) : 0);
    t.playingXI.forEach(function(p) {
      var orderBonus = (p.idealBattingPos && p.idealBattingPos.some(function(pos) { return pos <= 3; })) ? 1.3 : 1.0;
      var avgRuns = Math.pow((p.bat || 10) / 100, 2.5) * 45 * orderBonus;
      var totalRuns = Math.round(avgRuns * matchesPlayed * (0.85 + Math.random() * 0.3));
      
      var bowlBonus = (p.idealBowlingOvers && (p.idealBowlingOvers.includes('1-6') || p.idealBowlingOvers.includes('16-20'))) ? 1.2 : 1.0;
      var avgWickets = Math.pow((p.bowl || 10) / 100, 2.5) * 1.5 * bowlBonus;
      var totalWickets = Math.round(avgWickets * matchesPlayed * (0.8 + Math.random() * 0.4));
      
      allPlayers.push({
        name: p.name,
        team: t.name,
        runs: totalRuns,
        wickets: totalWickets,
        role: p.role
      });
    });
  });

  var sortedByRuns = allPlayers.slice().sort(function(a, b) { return b.runs - a.runs; });
  var sortedByWickets = allPlayers.slice().sort(function(a, b) { return b.wickets - a.wickets; });
  var orangeCap = sortedByRuns[0];
  var purpleCap = sortedByWickets[0];

  return {
    standings: teamsWithXI.map(function(t, idx) {
      return {
        rank: idx + 1, id: t.id, name: t.name, owner: t.owner, isHuman: t.isHuman,
        played: t.played, won: t.won, lost: t.lost, points: t.points, nrr: t.nrr,
        rating: t.overallRating, avgBat: t.avgBat, avgBowl: t.avgBowl,
        squadCount: t.squad.length, primaryColor: t.primaryColor,
        playingXI: t.playingXI, recentMatches: t.matchLog.slice(-5)
      };
    }),
    playoffs: {
      qualifier1: { match: q1, winner: q1Winner.name },
      eliminator: { match: elim, winner: elimWinner.name },
      qualifier2: { match: q2, winner: q2Winner.name },
      grandFinal: { match: finalMatch, winner: champion.name, championId: champion.id, runnerUp: runnerUp.name }
    },
    champion: { id: champion.id, name: champion.name, owner: champion.owner, isHuman: champion.isHuman, rating: champion.overallRating },
    awards: { orangeCap: orangeCap, purpleCap: purpleCap }
  };
}

function simulateMatch(teamA, teamB, stage) {
  stage = stage || 'League';
  var batA = teamA.avgBat || 70;
  var bowlA = teamA.avgBowl || 70;
  var batB = teamB.avgBat || 70;
  var bowlB = teamB.avgBowl || 70;

  var diffA = batA - bowlB;
  var diffB = batB - bowlA;
  var netAdvantageA = (diffA - diffB) / 2;
  var winProbA = 1 / (1 + Math.pow(10, -netAdvantageA / 40));
  var aWins = Math.random() < winProbA;

  var baseScoreA = Math.round(135 + (diffA * 0.6) + (Math.random() * 40 - 20));
  var baseScoreB = Math.round(135 + (diffB * 0.6) + (Math.random() * 40 - 20));

  var scoreA, scoreB, wicketsA, wicketsB;
  var oversA = 20.0, oversB = 20.0;

  if (aWins) {
    scoreA = Math.max(140, baseScoreA + 10);
    scoreB = Math.min(scoreA - (Math.floor(Math.random() * 25) + 3), Math.max(110, baseScoreB));
    wicketsA = Math.floor(Math.random() * 6) + 3;
    wicketsB = Math.min(10, Math.floor(Math.random() * 5) + 6);
  } else {
    scoreB = Math.max(140, baseScoreB + 10);
    scoreA = Math.min(scoreB - (Math.floor(Math.random() * 25) + 3), Math.max(110, baseScoreA));
    wicketsB = Math.floor(Math.random() * 6) + 3;
    wicketsA = Math.min(10, Math.floor(Math.random() * 5) + 6);
  }

  var winnerId = aWins ? teamA.id : teamB.id;
  var winnerName = aWins ? teamA.name : teamB.name;

  function generateScorecard(batTeam, bowlTeam, runs, wickets) {
    var scorecard = { batters: [], bowlers: [] };
    if (!batTeam.playingXI || !bowlTeam.playingXI) return scorecard;
    
    var batters = batTeam.playingXI;
    var totalBatWeight = 0;
    var weights = [];
    var battedCount = Math.min(11, wickets + 2 + Math.floor(Math.random() * 2)); 
    for(var i=0; i<11; i++) {
      if(i < battedCount && batters[i]) {
        var w = Math.pow((batters[i].bat || 10)/100, 2);
        if(i < 3) w *= 1.4;
        else if(i < 6) w *= 1.1;
        weights.push(w);
        totalBatWeight += w;
      } else {
        weights.push(0);
      }
    }
    
    var runsAssigned = 0;
    for(var i=0; i<11; i++) {
      if(weights[i] > 0 && batters[i]) {
        var r = Math.round((weights[i] / totalBatWeight) * runs);
        runsAssigned += r;
        var balls = Math.max(1, Math.round(r / (0.8 + Math.random()*0.8)));
        scorecard.batters.push({ name: batters[i].name, runs: r, balls: balls, out: i < wickets });
      }
    }
    if (scorecard.batters.length > 0) scorecard.batters[0].runs += (runs - runsAssigned);
    
    var possibleBowlers = bowlTeam.playingXI.filter(function(p) { return (p.bowl >= 50 || p.role.includes('Bowl') || p.role.includes('Allrounder')) && p.role !== 'Wicketkeeper'; });
    if(possibleBowlers.length < 5) possibleBowlers = bowlTeam.playingXI.slice().sort(function(a,b){return b.bowl-a.bowl}).slice(0,5);
    
    var oversToAssign = 20;
    var assignedOvers = [];
    for(var i=0; i<possibleBowlers.length; i++) assignedOvers.push(0);
    
    while(oversToAssign > 0) {
      for(var i=0; i<possibleBowlers.length; i++) {
        if(oversToAssign > 0 && assignedOvers[i] < 4) {
          assignedOvers[i]++;
          oversToAssign--;
        }
      }
    }
    
    var totalBowlWeight = 0;
    var bWeights = [];
    for(var i=0; i<possibleBowlers.length; i++) {
      var bw = Math.pow((possibleBowlers[i].bowl || 10)/100, 2);
      bWeights.push(bw);
      totalBowlWeight += bw;
    }
    
    var wktsAssigned = 0;
    var runsConceded = 0;
    for(var i=0; i<possibleBowlers.length; i++) {
      var w = Math.round((bWeights[i] / totalBowlWeight) * wickets);
      var rc = assignedOvers[i] * Math.round(runs/20) + Math.floor(Math.random()*10 - 5);
      if (rc < 0) rc = 0;
      wktsAssigned += w;
      runsConceded += rc;
      scorecard.bowlers.push({ name: possibleBowlers[i].name, overs: assignedOvers[i], wickets: w, runs: rc });
    }
    if (scorecard.bowlers.length > 0) {
      scorecard.bowlers[0].wickets += (wickets - wktsAssigned);
      scorecard.bowlers[0].runs += (runs - runsConceded);
      if (scorecard.bowlers[0].wickets < 0) scorecard.bowlers[0].wickets = 0;
      if (scorecard.bowlers[0].runs < 0) scorecard.bowlers[0].runs = 0;
    }
    
    return scorecard;
  }

  return {
    stage: stage, teamA: teamA.name, teamB: teamB.name,
    scoreA: scoreA, wicketsA: wicketsA, oversA: oversA, scoreB: scoreB, wicketsB: wicketsB, oversB: oversB,
    winnerId: winnerId, winnerName: winnerName,
    highlight: stage + ': ' + winnerName + ' won (' + scoreA + '/' + wicketsA + ' vs ' + scoreB + '/' + wicketsB + ')',
    scorecardA: generateScorecard(teamA, teamB, scoreA, wicketsA),
    scorecardB: generateScorecard(teamB, teamA, scoreB, wicketsB)
  };
}

module.exports = {
  generatePlayerPool: generatePlayerPool,
  getNextBidIncrement: getNextBidIncrement,
  canTeamBid: canTeamBid,
  canBowl: canBowl,
  isBatter: isBatter,
  isPureBowler: isPureBowler,
  isPureBatter: isPureBatter,
  getBattingPositionPenalty: getBattingPositionPenalty,
  getBowlingPhasePenalty: getBowlingPhasePenalty,
  evaluateBotInterest: evaluateBotInterest,
  autoSelectPlayingXI: autoSelectPlayingXI,
  validatePlayingXI: validatePlayingXI,
  calculateTeamRatings: calculateTeamRatings,
  simulateSeason: simulateSeason
};
