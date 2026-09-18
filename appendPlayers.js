const fs = require('fs');
const path = 'c:\\Users\\siddc\\Downloads\\test-arena-01a0b4d7-test\\test-arena-01a0b4d7-test\\playersData.js';
let content = fs.readFileSync(path, 'utf8');

const newPlayers = [
  // 12 Batsmen
  { name: "V. Kohlo", country: "IND", role: "Batsman", bat: 95, bowl: 15, ovr: 95, basePrice: 2, trait: "Chase Master (⭐⭐⭐)", idealBattingPos: [1,2,3,4], idealBowlingOvers: [] },
  { name: "R. Potedar", country: "IND", role: "Batsman", bat: 85, bowl: 12, ovr: 85, basePrice: 1.5, trait: "Spin Destroyer (⭐⭐)", idealBattingPos: [4,5,6], idealBowlingOvers: [] },
  { name: "S. Iyar", country: "IND", role: "Batsman", bat: 88, bowl: 10, ovr: 88, basePrice: 1.5, trait: "Anchor (⭐⭐)", idealBattingPos: [3,4], idealBowlingOvers: [] },
  { name: "N. Ranaa", country: "IND", role: "Batsman", bat: 84, bowl: 35, ovr: 84, basePrice: 1, trait: "Captain Cool (⭐)", idealBattingPos: [3,4,5], idealBowlingOvers: [] },
  { name: "M. Agarwel", country: "IND", role: "Batsman", bat: 82, bowl: 10, ovr: 82, basePrice: 0.75, trait: "Fast Starter (⭐)", idealBattingPos: [1,2], idealBowlingOvers: [] },
  { name: "T. Heed", country: "AUS", role: "Batsman", bat: 93, bowl: 25, ovr: 93, basePrice: 2, trait: "Powerplay Destroyer (⭐⭐⭐)", idealBattingPos: [1,2,3], idealBowlingOvers: [] },
  { name: "M. Lebuschagne", country: "AUS", role: "Batsman", bat: 86, bowl: 40, ovr: 86, basePrice: 1, trait: "Sheet Anchor (⭐⭐)", idealBattingPos: [3,4], idealBowlingOvers: [] },
  { name: "D. Mullar", country: "SA", role: "Batsman", bat: 90, bowl: 15, ovr: 90, basePrice: 1.5, trait: "Finisher (⭐⭐⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: [] },
  { name: "H. Briok", country: "ENG", role: "Batsman", bat: 89, bowl: 15, ovr: 89, basePrice: 1.5, trait: "Fearless Hitter (⭐⭐)", idealBattingPos: [4,5], idealBowlingOvers: [] },
  { name: "R. Rovmen", country: "WI", role: "Batsman", bat: 85, bowl: 20, ovr: 85, basePrice: 1, trait: "Power Striker (⭐⭐)", idealBattingPos: [5,6], idealBowlingOvers: [] },
  { name: "K. Meyars", country: "WI", role: "Batsman", bat: 83, bowl: 35, ovr: 83, basePrice: 0.75, trait: "Pinch Hitter (⭐)", idealBattingPos: [1,2], idealBowlingOvers: [] },
  { name: "P. Nesanka", country: "SL", role: "Batsman", bat: 81, bowl: 10, ovr: 81, basePrice: 0.5, trait: "Anchor (⭐)", idealBattingPos: [1,2,3], idealBowlingOvers: [] },

  // 8 Wicketkeeper
  { name: "D. Karthok", country: "IND", role: "Wicketkeeper", bat: 84, bowl: 10, ovr: 84, basePrice: 1, trait: "Finisher (⭐⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: [] },
  { name: "W. Seha", country: "IND", role: "Wicketkeeper", bat: 82, bowl: 10, ovr: 82, basePrice: 0.75, trait: "Lightning Gloves (⭐⭐)", idealBattingPos: [1,2], idealBowlingOvers: [] },
  { name: "J. Shurma", country: "IND", role: "Wicketkeeper", bat: 83, bowl: 15, ovr: 83, basePrice: 0.75, trait: "Death Over Blaster (⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: [] },
  { name: "K. Rethoder", country: "IND", role: "Wicketkeeper", bat: 78, bowl: 12, ovr: 78, basePrice: 0.5, trait: "Emerging Player (⭐)", idealBattingPos: [3,4], idealBowlingOvers: [] },
  { name: "M. Wadu", country: "AUS", role: "Wicketkeeper", bat: 85, bowl: 10, ovr: 85, basePrice: 1, trait: "Crisis Man (⭐⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: [] },
  { name: "J. Baristow", country: "ENG", role: "Wicketkeeper", bat: 88, bowl: 10, ovr: 88, basePrice: 1.5, trait: "Powerplay Destroyer (⭐⭐)", idealBattingPos: [1,2], idealBowlingOvers: [] },
  { name: "R. Gurbaz", country: "AFG", role: "Wicketkeeper", bat: 83, bowl: 15, ovr: 83, basePrice: 0.75, trait: "Fearless Opener (⭐)", idealBattingPos: [1,2], idealBowlingOvers: [] },
  { name: "K. Mendos", country: "SL", role: "Wicketkeeper", bat: 80, bowl: 15, ovr: 80, basePrice: 0.5, trait: "Anchor (⭐)", idealBattingPos: [3,4], idealBowlingOvers: [] },

  // 10 Fast Bowlers
  { name: "M. Seraj", country: "IND", role: "Fast Bowler", bat: 15, bowl: 92, ovr: 92, basePrice: 2, trait: "Swing King (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "16-20"] },
  { name: "A. Seng", country: "IND", role: "Fast Bowler", bat: 25, bowl: 90, ovr: 90, basePrice: 1.5, trait: "Death Bowling Specialist (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "16-20"] },
  { name: "U. Melek", country: "IND", role: "Fast Bowler", bat: 15, bowl: 85, ovr: 85, basePrice: 1, trait: "Express Pace (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "N. Sandhu", country: "IND", role: "Fast Bowler", bat: 20, bowl: 82, ovr: 82, basePrice: 0.75, trait: "Swing King (⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6"] },
  { name: "Y. Deyal", country: "IND", role: "Fast Bowler", bat: 20, bowl: 80, ovr: 80, basePrice: 0.5, trait: "Swing King (⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6"] },
  { name: "J. Hozlewood", country: "AUS", role: "Fast Bowler", bat: 20, bowl: 91, ovr: 91, basePrice: 1.5, trait: "Line and Length (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "16-20"] },
  { name: "K. Robada", country: "SA", role: "Fast Bowler", bat: 30, bowl: 93, ovr: 93, basePrice: 2, trait: "Yorker King (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "16-20"] },
  { name: "T. Bault", country: "NZ", role: "Fast Bowler", bat: 25, bowl: 92, ovr: 92, basePrice: 2, trait: "Swing King (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6"] },
  { name: "L. Fergusen", country: "NZ", role: "Fast Bowler", bat: 20, bowl: 87, ovr: 87, basePrice: 1, trait: "Express Pace (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15", "16-20"] },
  { name: "M. Wod", country: "ENG", role: "Fast Bowler", bat: 25, bowl: 89, ovr: 89, basePrice: 1.5, trait: "Bouncer Specialist (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "16-20"] },

  // 8 Spinners
  { name: "K. Yedav", country: "IND", role: "Spinner", bat: 30, bowl: 91, ovr: 91, basePrice: 1.5, trait: "Mystery Spinner (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "Y. Chohel", country: "IND", role: "Spinner", bat: 15, bowl: 90, ovr: 90, basePrice: 1.5, trait: "Big Turner (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "R. Beshnoi", country: "IND", role: "Spinner", bat: 25, bowl: 86, ovr: 86, basePrice: 1, trait: "Googly Master (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "W. Chekerverti", country: "IND", role: "Spinner", bat: 20, bowl: 87, ovr: 87, basePrice: 1, trait: "Mystery Spinner (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "S. Komer", country: "IND", role: "Spinner", bat: 20, bowl: 78, ovr: 78, basePrice: 0.5, trait: "Economical Choker (⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "R. Khen", country: "AFG", role: "Spinner", bat: 45, bowl: 95, ovr: 95, basePrice: 2, trait: "Mystery Spinner (⭐⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },
  { name: "M. Theekshane", country: "SL", role: "Spinner", bat: 25, bowl: 85, ovr: 85, basePrice: 1, trait: "Mystery Spinner (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6", "7-15"] },
  { name: "A. Jompa", country: "AUS", role: "Spinner", bat: 20, bowl: 88, ovr: 88, basePrice: 1.5, trait: "Googly Master (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15"] },

  // 10 Allrounders (5 Fast, 5 Spin)
  { name: "S. Dobe", country: "IND", role: "Fast Bowling Allrounder", bat: 85, bowl: 65, ovr: 82, basePrice: 1, trait: "Spin Destroyer (⭐⭐)", idealBattingPos: [4,5,6], idealBowlingOvers: ["7-15"] },
  { name: "V. Shankar", country: "IND", role: "Fast Bowling Allrounder", bat: 75, bowl: 70, ovr: 73, basePrice: 0.5, trait: "Jack of All Trades (⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: ["7-15"] },
  { name: "B. Stukes", country: "ENG", role: "Fast Bowling Allrounder", bat: 88, bowl: 82, ovr: 86, basePrice: 2, trait: "Crisis Man (⭐⭐⭐)", idealBattingPos: [4,5,6], idealBowlingOvers: ["7-15"] },
  { name: "C. Morros", country: "SA", role: "Fast Bowling Allrounder", bat: 75, bowl: 86, ovr: 82, basePrice: 1.5, trait: "Death Bowling Specialist (⭐⭐)", idealBattingPos: [6,7], idealBowlingOvers: ["16-20"] },
  { name: "A. Omerzai", country: "AFG", role: "Fast Bowling Allrounder", bat: 78, bowl: 78, ovr: 78, basePrice: 0.75, trait: "Jack of All Trades (⭐)", idealBattingPos: [5,6,7], idealBowlingOvers: ["7-15"] },

  { name: "W. Sundor", country: "IND", role: "Spin Bowling Allrounder", bat: 75, bowl: 82, ovr: 80, basePrice: 0.75, trait: "Powerplay Choker (⭐⭐)", idealBattingPos: [6,7], idealBowlingOvers: ["1-6", "7-15"] },
  { name: "K. Gowtem", country: "IND", role: "Spin Bowling Allrounder", bat: 72, bowl: 75, ovr: 74, basePrice: 0.5, trait: "Pinch Hitter (⭐)", idealBattingPos: [6,7], idealBowlingOvers: ["7-15"] },
  { name: "S. Al Hasen", country: "BAN", role: "Spin Bowling Allrounder", bat: 85, bowl: 88, ovr: 87, basePrice: 1.5, trait: "Jack of All Trades (⭐⭐⭐)", idealBattingPos: [3,4,5], idealBowlingOvers: ["7-15"] },
  { name: "M. Sintner", country: "NZ", role: "Spin Bowling Allrounder", bat: 70, bowl: 85, ovr: 80, basePrice: 1, trait: "Economical Choker (⭐⭐)", idealBattingPos: [6,7], idealBowlingOvers: ["7-15"] },
  { name: "G. Phollops", country: "NZ", role: "Spin Bowling Allrounder", bat: 83, bowl: 72, ovr: 80, basePrice: 1, trait: "Laser Fielder (⭐⭐)", idealBattingPos: [5,6], idealBowlingOvers: ["7-15"] },

  // 7 Medium Pace Bowlers
  { name: "H. Petal", country: "IND", role: "Medium Pace Bowler", bat: 35, bowl: 82, ovr: 82, basePrice: 1, trait: "Slower Ball Master (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["16-20"] },
  { name: "S. Sherma", country: "IND", role: "Medium Pace Bowler", bat: 25, bowl: 78, ovr: 78, basePrice: 0.75, trait: "Swing King (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6"] },
  { name: "M. Sherma", country: "IND", role: "Medium Pace Bowler", bat: 20, bowl: 80, ovr: 80, basePrice: 0.75, trait: "Slower Ball Master (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["16-20"] },
  { name: "D. Chehar", country: "IND", role: "Medium Pace Bowler", bat: 45, bowl: 81, ovr: 81, basePrice: 1, trait: "Powerplay Choker (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["1-6"] },
  { name: "A. Tye", country: "AUS", role: "Medium Pace Bowler", bat: 30, bowl: 79, ovr: 79, basePrice: 0.75, trait: "Knuckle Ball Expert (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["16-20"] },
  { name: "M. Fozlur", country: "BAN", role: "Medium Pace Bowler", bat: 20, bowl: 75, ovr: 75, basePrice: 0.5, trait: "Cutter Specialist (⭐)", idealBattingPos: [], idealBowlingOvers: ["7-15", "16-20"] },
  { name: "S. Kuran", country: "ENG", role: "Medium Pace Bowler", bat: 50, bowl: 82, ovr: 82, basePrice: 1, trait: "Death Bowling Specialist (⭐⭐)", idealBattingPos: [], idealBowlingOvers: ["16-20"] }
];

const newPlayersString = newPlayers.map(p => '  ' + JSON.stringify(p, null, 2).replace(/\\n/g, '\n').split('\n').join('\n  ')).join(',\n') + '\n';

content = content.replace('  }\n];', '  },\n' + newPlayersString + '];');

fs.writeFileSync(path, content, 'utf8');
