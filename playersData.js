// Player base dataset with inspired-by-real-IPL-stars attributes, traits, and realistic stats
// Categories: Batsman, Wicketkeeper, Fast Bowler, Fast Bowling Allrounder, Spin Bowling Allrounder, Spinner, Medium Pace Bowler
// Special traits: Finisher, Chase Master, Yorker King, Mystery Spinner, Powerplay Destroyer, Jack of All Trades, Lightning Gloves, Anchor, Swing Wizard, Death Over Specialist, Googly Master, Captain Cool, Pinch Hitter, Laser Fielder, Sheet Anchor, etc.

const PLAYER_TEMPLATES = [
  {
    name: "V. Kulho",
    country: "IND",
    role: "Batsman",
    bat: 98,
    bowl: 35,
    ovr: 98,
    basePrice: 2,
    trait: "Chase Master (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Shermen",
    country: "IND",
    role: "Batsman",
    bat: 95,
    bowl: 30,
    ovr: 95,
    basePrice: 2,
    trait: "Powerplay Destroyer (⭐⭐⭐), Chase Master (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Yedevjo",
    country: "IND",
    role: "Batsman",
    bat: 96,
    bowl: 25,
    ovr: 96,
    basePrice: 2,
    trait: "360 Degree Innovator (⭐⭐⭐), Chase Master (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Gol",
    country: "IND",
    role: "Batsman",
    bat: 91,
    bowl: 20,
    ovr: 91,
    basePrice: 2,
    trait: "Anchor (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "D. Wernur",
    country: "AUS",
    role: "Batsman",
    bat: 92,
    bowl: 22,
    ovr: 92,
    basePrice: 2,
    trait: "Powerplay Destroyer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "T. Hidi",
    country: "AUS",
    role: "Batsman",
    bat: 94,
    bowl: 45,
    ovr: 94,
    basePrice: 2,
    trait: "Powerplay Destroyer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Sonhi",
    country: "IND",
    role: "Batsman",
    bat: 89,
    bowl: 20,
    ovr: 89,
    basePrice: 1.5,
    trait: "Finisher (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "Y. Jeoswel",
    country: "IND",
    role: "Batsman",
    bat: 92,
    bowl: 25,
    ovr: 92,
    basePrice: 1.5,
    trait: "Fearless Hitter (⭐⭐), Chase Master (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Geokwed",
    country: "IND",
    role: "Batsman",
    bat: 89,
    bowl: 20,
    ovr: 89,
    basePrice: 1.5,
    trait: "Sheet Anchor (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "F. da Plissy",
    country: "SA",
    role: "Batsman",
    bat: 88,
    bowl: 22,
    ovr: 88,
    basePrice: 1.5,
    trait: "Captain Cool (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Hitmyri",
    country: "WI",
    role: "Batsman",
    bat: 86,
    bowl: 15,
    ovr: 86,
    basePrice: 1,
    trait: "Death Over Blaster (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Petoder",
    country: "IND",
    role: "Batsman",
    bat: 86,
    bowl: 20,
    ovr: 86,
    basePrice: 1,
    trait: "Spin Destroyer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Sadhersen",
    country: "IND",
    role: "Batsman",
    bat: 85,
    bowl: 20,
    ovr: 85,
    basePrice: 1,
    trait: "Anchor (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "K. Wolloems",
    country: "NZ",
    role: "Batsman",
    bat: 87,
    bowl: 30,
    ovr: 87,
    basePrice: 1.5,
    trait: "Crisis Man (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "D. Pedokkel",
    country: "IND",
    role: "Batsman",
    bat: 82,
    bowl: 15,
    ovr: 82,
    basePrice: 0.75,
    trait: "Stroke Maker (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "P. Shewi",
    country: "IND",
    role: "Batsman",
    bat: 83,
    bowl: 15,
    ovr: 83,
    basePrice: 0.75,
    trait: "Pinch Hitter (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "A. Shermen",
    country: "IND",
    role: "Batsman",
    bat: 90,
    bowl: 65,
    ovr: 90,
    basePrice: 1.5,
    trait: "Powerplay Destroyer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "T. Verme",
    country: "IND",
    role: "Batsman",
    bat: 87,
    bowl: 40,
    ovr: 87,
    basePrice: 1,
    trait: "Middle Order Anchor (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "J. Fresir",
    country: "AUS",
    role: "Batsman",
    bat: 91,
    bowl: 20,
    ovr: 91,
    basePrice: 1.5,
    trait: "Powerplay Destroyer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "G. Phollop",
    country: "NZ",
    role: "Batsman",
    bat: 87,
    bowl: 60,
    ovr: 87,
    basePrice: 1,
    trait: "Laser Fielder (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Songhi",
    country: "IND",
    role: "Batsman",
    bat: 84,
    bowl: 25,
    ovr: 84,
    basePrice: 0.5,
    trait: "Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "M. Dhunii",
    country: "IND",
    role: "Wicketkeeper",
    bat: 92,
    bowl: 10,
    ovr: 92,
    basePrice: 2,
    trait: "Captain Cool (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "J. Batlur",
    country: "ENG",
    role: "Wicketkeeper",
    bat: 95,
    bowl: 20,
    ovr: 95,
    basePrice: 2,
    trait: "Finisher (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "H. Kleesin",
    country: "SA",
    role: "Wicketkeeper",
    bat: 95,
    bowl: 20,
    ovr: 95,
    basePrice: 2,
    trait: "Spin Smasher (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Pent",
    country: "IND",
    role: "Wicketkeeper",
    bat: 93,
    bowl: 20,
    ovr: 93,
    basePrice: 2,
    trait: "Lightning Gloves (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Semzin",
    country: "IND",
    role: "Wicketkeeper",
    bat: 90,
    bowl: 20,
    ovr: 90,
    basePrice: 2,
    trait: "Fearless Hitter (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "K. Rehuul",
    country: "IND",
    role: "Wicketkeeper",
    bat: 91,
    bowl: 20,
    ovr: 91,
    basePrice: 2,
    trait: "Sheet Anchor (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "N. Puuren",
    country: "WI",
    role: "Wicketkeeper",
    bat: 91,
    bowl: 18,
    ovr: 91,
    basePrice: 2,
    trait: "Finisher (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "I. Koshun",
    country: "IND",
    role: "Wicketkeeper",
    bat: 87,
    bowl: 20,
    ovr: 87,
    basePrice: 1.5,
    trait: "Pocket Dynamo (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "P. Selt",
    country: "ENG",
    role: "Wicketkeeper",
    bat: 89,
    bowl: 15,
    ovr: 89,
    basePrice: 1.5,
    trait: "Fast Starter (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "Q. di Kuck",
    country: "SA",
    role: "Wicketkeeper",
    bat: 88,
    bowl: 15,
    ovr: 88,
    basePrice: 1.5,
    trait: "Power Striker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "R. Garbez",
    country: "AFG",
    role: "Wicketkeeper",
    bat: 83,
    bowl: 15,
    ovr: 83,
    basePrice: 0.75,
    trait: "Fearless Opener (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "J. Shermen",
    country: "IND",
    role: "Wicketkeeper",
    bat: 84,
    bowl: 15,
    ovr: 84,
    basePrice: 0.75,
    trait: "Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "D. Jaril",
    country: "IND",
    role: "Wicketkeeper",
    bat: 85,
    bowl: 15,
    ovr: 85,
    basePrice: 0.75,
    trait: "Lightning Gloves (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "T. Stabbs",
    country: "SA",
    role: "Wicketkeeper",
    bat: 88,
    bowl: 35,
    ovr: 88,
    basePrice: 1,
    trait: "360 Degree Innovator (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "H. Pendoye",
    country: "IND",
    role: "Fast Bowling Allrounder",
    bat: 90,
    bowl: 88,
    ovr: 89,
    basePrice: 2,
    trait: "Jack of All Trades (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Rassilli",
    country: "WI",
    role: "Fast Bowling Allrounder",
    bat: 94,
    bowl: 87,
    ovr: 91,
    basePrice: 2,
    trait: "Muscle Finisher (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "C. Grini",
    country: "AUS",
    role: "Fast Bowling Allrounder",
    bat: 88,
    bowl: 84,
    ovr: 86,
    basePrice: 2,
    trait: "Jack of All Trades (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Stuonos",
    country: "AUS",
    role: "Fast Bowling Allrounder",
    bat: 89,
    bowl: 83,
    ovr: 86,
    basePrice: 1.5,
    trait: "Hulk Finisher (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Carrun",
    country: "ENG",
    role: "Fast Bowling Allrounder",
    bat: 83,
    bowl: 87,
    ovr: 85,
    basePrice: 2,
    trait: "Death Over Specialist (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Merz",
    country: "AUS",
    role: "Fast Bowling Allrounder",
    bat: 87,
    bowl: 81,
    ovr: 84,
    basePrice: 1.5,
    trait: "Pinch Hitter (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Shipherd",
    country: "WI",
    role: "Fast Bowling Allrounder",
    bat: 84,
    bowl: 82,
    ovr: 83,
    basePrice: 0.75,
    trait: "Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Dabiy",
    country: "IND",
    role: "Fast Bowling Allrounder",
    bat: 91,
    bowl: 68,
    ovr: 80,
    basePrice: 1.5,
    trait: "Spin Smasher (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "N. Riddy",
    country: "IND",
    role: "Fast Bowling Allrounder",
    bat: 84,
    bowl: 80,
    ovr: 82,
    basePrice: 0.75,
    trait: "Jack of All Trades (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Jensin",
    country: "SA",
    role: "Fast Bowling Allrounder",
    bat: 78,
    bowl: 88,
    ovr: 83,
    basePrice: 1.5,
    trait: "Bounce Extractor (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "J. Huldur",
    country: "WI",
    role: "Fast Bowling Allrounder",
    bat: 79,
    bowl: 84,
    ovr: 82,
    basePrice: 1,
    trait: "Crisis Man (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Thekri",
    country: "IND",
    role: "Fast Bowling Allrounder",
    bat: 76,
    bowl: 83,
    ovr: 80,
    basePrice: 1,
    trait: "Golden Arm (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Jediye",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 88,
    bowl: 92,
    ovr: 90,
    basePrice: 2,
    trait: "Jack of All Trades (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Petiil",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 87,
    bowl: 90,
    ovr: 89,
    basePrice: 2,
    trait: "Economical Choker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "G. Mexwil",
    country: "AUS",
    role: "Spin Bowling Allrounder",
    bat: 91,
    bowl: 80,
    ovr: 86,
    basePrice: 2,
    trait: "Big Show (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Neroni",
    country: "WI",
    role: "Spin Bowling Allrounder",
    bat: 89,
    bowl: 94,
    ovr: 92,
    basePrice: 2,
    trait: "Mystery Spinner (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "W. Heserenge",
    country: "SL",
    role: "Spin Bowling Allrounder",
    bat: 78,
    bowl: 91,
    ovr: 85,
    basePrice: 1.5,
    trait: "Googly Master (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Chendren Ashwon",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 80,
    bowl: 89,
    ovr: 85,
    basePrice: 1.5,
    trait: "Carrom Ball (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Alii",
    country: "ENG",
    role: "Spin Bowling Allrounder",
    bat: 85,
    bowl: 83,
    ovr: 84,
    basePrice: 1.5,
    trait: "Power Striker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "K. Pendoye",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 81,
    bowl: 84,
    ovr: 83,
    basePrice: 1,
    trait: "Economical Choker (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "W. Sandur",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 80,
    bowl: 84,
    ovr: 82,
    basePrice: 1,
    trait: "Powerplay Choker (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "L. Lovongstun",
    country: "ENG",
    role: "Spin Bowling Allrounder",
    bat: 88,
    bowl: 78,
    ovr: 83,
    basePrice: 1.5,
    trait: "Monster Sixes (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "W. Jecks",
    country: "ENG",
    role: "Spin Bowling Allrounder",
    bat: 87,
    bowl: 75,
    ovr: 81,
    basePrice: 1,
    trait: "Fast Starter (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Tiwetoe",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 86,
    bowl: 76,
    ovr: 81,
    basePrice: 1,
    trait: "Iceman Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "J. Bamreh",
    country: "IND",
    role: "Fast Bowler",
    bat: 30,
    bowl: 99,
    ovr: 99,
    basePrice: 2,
    trait: "Yorker King (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Sterc",
    country: "AUS",
    role: "Fast Bowler",
    bat: 55,
    bowl: 95,
    ovr: 95,
    basePrice: 2,
    trait: "Yorker King (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "P. Cammonz",
    country: "AUS",
    role: "Fast Bowler",
    bat: 75,
    bowl: 94,
    ovr: 94,
    basePrice: 2,
    trait: "Captain Cool (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "T. Bualti",
    country: "NZ",
    role: "Fast Bowler",
    bat: 30,
    bowl: 93,
    ovr: 93,
    basePrice: 2,
    trait: "Powerplay Wrecker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Shemii",
    country: "IND",
    role: "Fast Bowler",
    bat: 25,
    bowl: 94,
    ovr: 94,
    basePrice: 2,
    trait: "Seam Master (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Sorej",
    country: "IND",
    role: "Fast Bowler",
    bat: 20,
    bowl: 91,
    ovr: 91,
    basePrice: 2,
    trait: "Fiery Bouncer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "K. Rebede",
    country: "SA",
    role: "Fast Bowler",
    bat: 40,
    bowl: 92,
    ovr: 92,
    basePrice: 2,
    trait: "Express Pace (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Sonhi",
    country: "IND",
    role: "Fast Bowler",
    bat: 20,
    bowl: 90,
    ovr: 90,
    basePrice: 1.5,
    trait: "Death Over Specialist (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Pethorene",
    country: "SL",
    role: "Fast Bowler",
    bat: 15,
    bowl: 93,
    ovr: 93,
    basePrice: 1.5,
    trait: "Slinga Yorker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Nurtji",
    country: "SA",
    role: "Fast Bowler",
    bat: 20,
    bowl: 90,
    ovr: 90,
    basePrice: 1.5,
    trait: "150kph Bullet (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "L. Firgasuni",
    country: "NZ",
    role: "Fast Bowler",
    bat: 25,
    bowl: 88,
    ovr: 88,
    basePrice: 1,
    trait: "Express Pace (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Kheni",
    country: "IND",
    role: "Fast Bowler",
    bat: 20,
    bowl: 87,
    ovr: 87,
    basePrice: 1,
    trait: "Death Over Specialist (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Yedevi",
    country: "IND",
    role: "Fast Bowler",
    bat: 15,
    bowl: 91,
    ovr: 91,
    basePrice: 1,
    trait: "155kph Lightning (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "H. Reneh",
    country: "IND",
    role: "Fast Bowler",
    bat: 35,
    bowl: 87,
    ovr: 87,
    basePrice: 1,
    trait: "Slower Ball Magician (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "G. Cuitzii",
    country: "SA",
    role: "Fast Bowler",
    bat: 45,
    bowl: 87,
    ovr: 87,
    basePrice: 1,
    trait: "Fiery Bouncer (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "J. Hezliwuud",
    country: "AUS",
    role: "Fast Bowler",
    bat: 20,
    bowl: 93,
    ovr: 93,
    basePrice: 2,
    trait: "Laser Accuracy (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "T. Dishpendi",
    country: "IND",
    role: "Fast Bowler",
    bat: 20,
    bowl: 84,
    ovr: 84,
    basePrice: 0.75,
    trait: "Wicket Hunter (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "V. Arure",
    country: "IND",
    role: "Fast Bowler",
    bat: 18,
    bowl: 83,
    ovr: 83,
    basePrice: 0.5,
    trait: "Inswing Specialist (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "H. Petiil",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 55,
    bowl: 90,
    ovr: 90,
    basePrice: 1.5,
    trait: "Purple Cap Hunter (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Shermen",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 25,
    bowl: 88,
    ovr: 88,
    basePrice: 1,
    trait: "Knuckle Ball Wizard (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "D. Cheher",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 60,
    bowl: 88,
    ovr: 88,
    basePrice: 1.5,
    trait: "Swing Wizard (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "B. Kamur",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 45,
    bowl: 89,
    ovr: 89,
    basePrice: 1.5,
    trait: "Swing Wizard (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Shermen",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 20,
    bowl: 88,
    ovr: 88,
    basePrice: 1,
    trait: "Death Slower Ball (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "K. Ahmid",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 15,
    bowl: 86,
    ovr: 86,
    basePrice: 1,
    trait: "Left Arm Angler (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Kamur",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 20,
    bowl: 86,
    ovr: 86,
    basePrice: 1,
    trait: "Blockhole Machine (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Rehmun",
    country: "BAN",
    role: "Medium Pace Bowler",
    bat: 15,
    bowl: 89,
    ovr: 89,
    basePrice: 1.5,
    trait: "Fizz Cutter (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "Y. Deyel",
    country: "IND",
    role: "Medium Pace Bowler",
    bat: 15,
    bowl: 85,
    ovr: 85,
    basePrice: 0.75,
    trait: "Crisis Overcomer (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Khenn",
    country: "AFG",
    role: "Spinner",
    bat: 75,
    bowl: 98,
    ovr: 98,
    basePrice: 2,
    trait: "Mystery Spinner (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "Y. Chehell",
    country: "IND",
    role: "Spinner",
    bat: 15,
    bowl: 94,
    ovr: 94,
    basePrice: 2,
    trait: "Chess Grandmaster (⭐⭐⭐), Explosive Opener (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "K. Yedew",
    country: "IND",
    role: "Spinner",
    bat: 35,
    bowl: 95,
    ovr: 95,
    basePrice: 2,
    trait: "Chinaman Magician (⭐⭐⭐), Explosive Opener (⭐⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "V. Chekrevertho",
    country: "IND",
    role: "Spinner",
    bat: 20,
    bowl: 92,
    ovr: 92,
    basePrice: 1.5,
    trait: "Mystery Spinner (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Boshnuy",
    country: "IND",
    role: "Spinner",
    bat: 20,
    bowl: 89,
    ovr: 89,
    basePrice: 1.5,
    trait: "Googly Master (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Thiikshene",
    country: "SL",
    role: "Spinner",
    bat: 20,
    bowl: 88,
    ovr: 88,
    basePrice: 1,
    trait: "Carrom Ball (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "N. Ahmedi",
    country: "AFG",
    role: "Spinner",
    bat: 20,
    bowl: 88,
    ovr: 88,
    basePrice: 1,
    trait: "Mystery Spinner (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Shermenn",
    country: "IND",
    role: "Spinner",
    bat: 15,
    bowl: 83,
    ovr: 83,
    basePrice: 0.5,
    trait: "Quick Legbreak (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Zempe",
    country: "AUS",
    role: "Spinner",
    bat: 20,
    bowl: 89,
    ovr: 89,
    basePrice: 1.5,
    trait: "Googly Master (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "M. Merkendi",
    country: "IND",
    role: "Spinner",
    bat: 20,
    bowl: 83,
    ovr: 83,
    basePrice: 0.5,
    trait: "Googly Master (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Cheher",
    country: "IND",
    role: "Spinner",
    bat: 25,
    bowl: 85,
    ovr: 85,
    basePrice: 0.75,
    trait: "Aggressive Leggie (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Koshuri",
    country: "IND",
    role: "Spinner",
    bat: 30,
    bowl: 86,
    ovr: 86,
    basePrice: 0.75,
    trait: "Height & Bounce (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "A. Reghavensho",
    country: "IND",
    role: "Batsman",
    bat: 83,
    bowl: 30,
    ovr: 83,
    basePrice: 0.5,
    trait: "Fearless Hitter (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "S. Rozvii",
    country: "IND",
    role: "Batsman",
    bat: 82,
    bowl: 25,
    ovr: 82,
    basePrice: 0.5,
    trait: "Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "N. Bargir",
    country: "SA",
    role: "Fast Bowler",
    bat: 25,
    bowl: 88,
    ovr: 88,
    basePrice: 0.75,
    trait: "150kph Bullet (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "N. Thashere",
    country: "SL",
    role: "Fast Bowler",
    bat: 15,
    bowl: 87,
    ovr: 87,
    basePrice: 0.75,
    trait: "Slinga Yorker (⭐⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "S. Juhnsun",
    country: "AUS",
    role: "Fast Bowler",
    bat: 20,
    bowl: 86,
    ovr: 86,
    basePrice: 0.75,
    trait: "Express Pace (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "T. Kutoen",
    country: "IND",
    role: "Spin Bowling Allrounder",
    bat: 78,
    bowl: 80,
    ovr: 79,
    basePrice: 0.5,
    trait: "Jack of All Trades (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "R. Songhi",
    country: "IND",
    role: "Fast Bowling Allrounder",
    bat: 83,
    bowl: 79,
    ovr: 81,
    basePrice: 0.5,
    trait: "Death Over Blaster (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: [
      "7-15"
    ]
  },
  {
    name: "N. Wedhire",
    country: "IND",
    role: "Batsman",
    bat: 84,
    bowl: 30,
    ovr: 84,
    basePrice: 0.5,
    trait: "Crisis Man (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    name: "A. Bedunii",
    country: "IND",
    role: "Batsman",
    bat: 84,
    bowl: 35,
    ovr: 84,
    basePrice: 0.5,
    trait: "Finisher (⭐)",
    idealBattingPos: [],
    idealBowlingOvers: []
  },
  {
    "name": "V. Kohlo",
    "country": "IND",
    "role": "Batsman",
    "bat": 95,
    "bowl": 15,
    "ovr": 95,
    "basePrice": 2,
    "trait": "Chase Master (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2,
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "R. Potedar",
    "country": "IND",
    "role": "Batsman",
    "bat": 85,
    "bowl": 12,
    "ovr": 85,
    "basePrice": 1.5,
    "trait": "Spin Destroyer (⭐⭐)",
    "idealBattingPos": [
      4,
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "S. Iyar",
    "country": "IND",
    "role": "Batsman",
    "bat": 88,
    "bowl": 10,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "N. Ranaa",
    "country": "IND",
    "role": "Batsman",
    "bat": 84,
    "bowl": 35,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Captain Cool (⭐)",
    "idealBattingPos": [
      3,
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "M. Agarwel",
    "country": "IND",
    "role": "Batsman",
    "bat": 82,
    "bowl": 10,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Fast Starter (⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "T. Heed",
    "country": "AUS",
    "role": "Batsman",
    "bat": 93,
    "bowl": 25,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2,
      3
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "M. Lebuschagne",
    "country": "AUS",
    "role": "Batsman",
    "bat": 86,
    "bowl": 40,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Sheet Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "D. Mullar",
    "country": "SA",
    "role": "Batsman",
    "bat": 90,
    "bowl": 15,
    "ovr": 90,
    "basePrice": 1.5,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "H. Briok",
    "country": "ENG",
    "role": "Batsman",
    "bat": 89,
    "bowl": 15,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Fearless Hitter (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "R. Rovmen",
    "country": "WI",
    "role": "Batsman",
    "bat": 85,
    "bowl": 20,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Power Striker (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "K. Meyars",
    "country": "WI",
    "role": "Batsman",
    "bat": 83,
    "bowl": 35,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Pinch Hitter (⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "P. Nesanka",
    "country": "SL",
    "role": "Batsman",
    "bat": 81,
    "bowl": 10,
    "ovr": 81,
    "basePrice": 0.5,
    "trait": "Anchor (⭐)",
    "idealBattingPos": [
      1,
      2,
      3
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "D. Karthok",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 84,
    "bowl": 10,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "W. Seha",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 82,
    "bowl": 10,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Lightning Gloves (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "J. Shurma",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 83,
    "bowl": 15,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Death Over Blaster (⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "K. Rethoder",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 78,
    "bowl": 12,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "M. Wadu",
    "country": "AUS",
    "role": "Wicketkeeper",
    "bat": 85,
    "bowl": 10,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Crisis Man (⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "J. Baristow",
    "country": "ENG",
    "role": "Wicketkeeper",
    "bat": 88,
    "bowl": 10,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "R. Gurbaz",
    "country": "AFG",
    "role": "Wicketkeeper",
    "bat": 83,
    "bowl": 15,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Fearless Opener (⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "K. Mendos",
    "country": "SL",
    "role": "Wicketkeeper",
    "bat": 80,
    "bowl": 15,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Anchor (⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "M. Seraj",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 92,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Swing King (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "A. Seng",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 90,
    "ovr": 90,
    "basePrice": 1.5,
    "trait": "Death Bowling Specialist (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "U. Melek",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Express Pace (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "N. Sandhu",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Swing King (⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Y. Deyal",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Swing King (⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "J. Hozlewood",
    "country": "AUS",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 1.5,
    "trait": "Line and Length (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "K. Robada",
    "country": "SA",
    "role": "Fast Bowler",
    "bat": 30,
    "bowl": 93,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "T. Bault",
    "country": "NZ",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 92,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Swing King (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "L. Fergusen",
    "country": "NZ",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1,
    "trait": "Express Pace (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "M. Wod",
    "country": "ENG",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 89,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "K. Yedav",
    "country": "IND",
    "role": "Spinner",
    "bat": 30,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 1.5,
    "trait": "Mystery Spinner (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Y. Chohel",
    "country": "IND",
    "role": "Spinner",
    "bat": 15,
    "bowl": 90,
    "ovr": 90,
    "basePrice": 1.5,
    "trait": "Big Turner (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "R. Beshnoi",
    "country": "IND",
    "role": "Spinner",
    "bat": 25,
    "bowl": 86,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Googly Master (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "W. Chekerverti",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "S. Komer",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Economical Choker (⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "R. Khen",
    "country": "AFG",
    "role": "Spinner",
    "bat": 45,
    "bowl": 95,
    "ovr": 95,
    "basePrice": 2,
    "trait": "Mystery Spinner (⭐⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "M. Theekshane",
    "country": "SL",
    "role": "Spinner",
    "bat": 25,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "A. Jompa",
    "country": "AUS",
    "role": "Spinner",
    "bat": 20,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Googly Master (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "S. Dobe",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 85,
    "bowl": 65,
    "ovr": 82,
    "basePrice": 1,
    "trait": "Spin Destroyer (⭐⭐)",
    "idealBattingPos": [
      4,
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "V. Shankar",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 75,
    "bowl": 70,
    "ovr": 73,
    "basePrice": 0.5,
    "trait": "Jack of All Trades (⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "B. Stukes",
    "country": "ENG",
    "role": "Fast Bowling Allrounder",
    "bat": 88,
    "bowl": 82,
    "ovr": 86,
    "basePrice": 2,
    "trait": "Crisis Man (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "C. Morros",
    "country": "SA",
    "role": "Fast Bowling Allrounder",
    "bat": 75,
    "bowl": 86,
    "ovr": 82,
    "basePrice": 1.5,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "A. Omerzai",
    "country": "AFG",
    "role": "Fast Bowling Allrounder",
    "bat": 78,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.75,
    "trait": "Jack of All Trades (⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "W. Sundor",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 75,
    "bowl": 82,
    "ovr": 80,
    "basePrice": 0.75,
    "trait": "Powerplay Choker (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "K. Gowtem",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 72,
    "bowl": 75,
    "ovr": 74,
    "basePrice": 0.5,
    "trait": "Pinch Hitter (⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "S. Al Hasen",
    "country": "BAN",
    "role": "Spin Bowling Allrounder",
    "bat": 85,
    "bowl": 88,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Jack of All Trades (⭐⭐⭐)",
    "idealBattingPos": [
      3,
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "M. Sintner",
    "country": "NZ",
    "role": "Spin Bowling Allrounder",
    "bat": 70,
    "bowl": 85,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Economical Choker (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "G. Phollops",
    "country": "NZ",
    "role": "Spin Bowling Allrounder",
    "bat": 83,
    "bowl": 72,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Laser Fielder (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "H. Petal",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 35,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 1,
    "trait": "Slower Ball Master (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "S. Sherma",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 25,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.75,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "M. Sherma",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 20,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.75,
    "trait": "Slower Ball Master (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "D. Chehar",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 45,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 1,
    "trait": "Powerplay Choker (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "A. Tye",
    "country": "AUS",
    "role": "Medium Pace Bowler",
    "bat": 30,
    "bowl": 79,
    "ovr": 79,
    "basePrice": 0.75,
    "trait": "Knuckle Ball Expert (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "M. Fozlur",
    "country": "BAN",
    "role": "Medium Pace Bowler",
    "bat": 20,
    "bowl": 75,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Cutter Specialist (⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "S. Kuran",
    "country": "ENG",
    "role": "Medium Pace Bowler",
    "bat": 50,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 1,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [],
    "idealBowlingOvers": [
      "16-20"
    ]
  }
];

// IPL 10 City Teams with colors
const IPL_TEAMS = [
  { id: "mumbai", name: "Mumbai", fullName: "Mumbai Champions", primaryColor: "#004BA0", secondaryColor: "#D1AB3E", shortCode: "MUM" },
  { id: "chennai", name: "Chennai", fullName: "Chennai Super Kings", primaryColor: "#F9CD05", secondaryColor: "#1D3557", shortCode: "CHE" },
  { id: "bengaluru", name: "Bengaluru", fullName: "Bengaluru Challengers", primaryColor: "#DA1818", secondaryColor: "#000000", shortCode: "BLR" },
  { id: "kolkata", name: "Kolkata", fullName: "Kolkata Knights", primaryColor: "#3A225D", secondaryColor: "#B3A125", shortCode: "KOL" },
  { id: "delhi", name: "Delhi", fullName: "Delhi Capitals", primaryColor: "#17449E", secondaryColor: "#DC0032", shortCode: "DEL" },
  { id: "ahmedabad", name: "Ahmedabad", fullName: "Ahmedabad Titans", primaryColor: "#1B2133", secondaryColor: "#B4975A", shortCode: "AHM" },
  { id: "lucknow", name: "Lucknow", fullName: "Lucknow Super Giants", primaryColor: "#0057B8", secondaryColor: "#E03A3E", shortCode: "LKN" },
  { id: "hyderabad", name: "Hyderabad", fullName: "Hyderabad Sunrisers", primaryColor: "#F26522", secondaryColor: "#000000", shortCode: "HYD" },
  { id: "jaipur", name: "Jaipur", fullName: "Jaipur Royals", primaryColor: "#EA1A85", secondaryColor: "#004B8C", shortCode: "JPR" },
  { id: "chandigarh", name: "Chandigarh", fullName: "Chandigarh Kings", primaryColor: "#ED1B24", secondaryColor: "#DCDDDF", shortCode: "CHD" }
];

module.exports = {
  PLAYER_TEMPLATES,
  IPL_TEAMS
};
