// Player base dataset with real IPL stars

const PLAYER_TEMPLATES = [
  {
    "name": "Virat Kohli",
    "country": "IND",
    "role": "Batsman",
    "bat": 95,
    "bowl": 15,
    "ovr": 95,
    "basePrice": 2,
    "trait": "Chase Master (⭐⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rohit Sharma",
    "country": "IND",
    "role": "Batsman",
    "bat": 94,
    "bowl": 20,
    "ovr": 94,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Suryakumar Yadav",
    "country": "IND",
    "role": "Batsman",
    "bat": 96,
    "bowl": 15,
    "ovr": 96,
    "basePrice": 2,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Shubman Gill",
    "country": "IND",
    "role": "Batsman",
    "bat": 92,
    "bowl": 10,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "David Warner",
    "country": "AUS",
    "role": "Batsman",
    "bat": 93,
    "bowl": 10,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Faf du Plessis",
    "country": "SA",
    "role": "Batsman",
    "bat": 90,
    "bowl": 10,
    "ovr": 90,
    "basePrice": 1.5,
    "trait": "Captain Cool (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Kane Williamson",
    "country": "NZ",
    "role": "Batsman",
    "bat": 89,
    "bowl": 15,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Steve Smith",
    "country": "AUS",
    "role": "Batsman",
    "bat": 88,
    "bowl": 20,
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
    "name": "Ruturaj Gaikwad",
    "country": "IND",
    "role": "Batsman",
    "bat": 88,
    "bowl": 10,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Yashasvi Jaiswal",
    "country": "IND",
    "role": "Batsman",
    "bat": 89,
    "bowl": 15,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Shreyas Iyer",
    "country": "IND",
    "role": "Batsman",
    "bat": 87,
    "bowl": 15,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Travis Head",
    "country": "AUS",
    "role": "Batsman",
    "bat": 91,
    "bowl": 25,
    "ovr": 91,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rinku Singh",
    "country": "IND",
    "role": "Batsman",
    "bat": 86,
    "bowl": 10,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Tilak Varma",
    "country": "IND",
    "role": "Batsman",
    "bat": 85,
    "bowl": 20,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Sai Sudharsan",
    "country": "IND",
    "role": "Batsman",
    "bat": 84,
    "bowl": 10,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Shimron Hetmyer",
    "country": "WI",
    "role": "Batsman",
    "bat": 85,
    "bowl": 10,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rajat Patidar",
    "country": "IND",
    "role": "Batsman",
    "bat": 84,
    "bowl": 10,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Spin Destroyer (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Devdutt Padikkal",
    "country": "IND",
    "role": "Batsman",
    "bat": 82,
    "bowl": 10,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2,
      3
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Prithvi Shaw",
    "country": "IND",
    "role": "Batsman",
    "bat": 83,
    "bowl": 10,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Manish Pandey",
    "country": "IND",
    "role": "Batsman",
    "bat": 80,
    "bowl": 10,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Jake Fraser-McGurk",
    "country": "AUS",
    "role": "Batsman",
    "bat": 86,
    "bowl": 10,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2,
      3
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Harry Brook",
    "country": "ENG",
    "role": "Batsman",
    "bat": 85,
    "bowl": 10,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Devon Conway",
    "country": "NZ",
    "role": "Batsman",
    "bat": 89,
    "bowl": 10,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Tim David",
    "country": "AUS",
    "role": "Batsman",
    "bat": 85,
    "bowl": 15,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "David Miller",
    "country": "SA",
    "role": "Batsman",
    "bat": 87,
    "bowl": 10,
    "ovr": 87,
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
    "name": "Will Jacks",
    "country": "ENG",
    "role": "Batsman",
    "bat": 86,
    "bowl": 35,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2,
      3
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Aiden Markram",
    "country": "SA",
    "role": "Batsman",
    "bat": 86,
    "bowl": 35,
    "ovr": 86,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rilee Rossouw",
    "country": "SA",
    "role": "Batsman",
    "bat": 84,
    "bowl": 10,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rahul Tripathi",
    "country": "IND",
    "role": "Batsman",
    "bat": 83,
    "bowl": 10,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Abhinav Manohar",
    "country": "IND",
    "role": "Batsman",
    "bat": 78,
    "bowl": 10,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Nehal Wadhera",
    "country": "IND",
    "role": "Batsman",
    "bat": 79,
    "bowl": 10,
    "ovr": 79,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Sameer Rizvi",
    "country": "IND",
    "role": "Batsman",
    "bat": 75,
    "bowl": 10,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Ashutosh Sharma",
    "country": "IND",
    "role": "Batsman",
    "bat": 77,
    "bowl": 10,
    "ovr": 77,
    "basePrice": 0.5,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Shashank Singh",
    "country": "IND",
    "role": "Batsman",
    "bat": 79,
    "bowl": 15,
    "ovr": 79,
    "basePrice": 0.5,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Ayush Badoni",
    "country": "IND",
    "role": "Batsman",
    "bat": 78,
    "bowl": 20,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "MS Dhoni",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 90,
    "bowl": 10,
    "ovr": 90,
    "basePrice": 2,
    "trait": "Captain Cool (⭐⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Jos Buttler",
    "country": "ENG",
    "role": "Wicketkeeper",
    "bat": 95,
    "bowl": 10,
    "ovr": 95,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "KL Rahul",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 91,
    "bowl": 10,
    "ovr": 91,
    "basePrice": 2,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Sanju Samson",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 90,
    "bowl": 10,
    "ovr": 90,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rishabh Pant",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 92,
    "bowl": 10,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Chase Master (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Heinrich Klaasen",
    "country": "SA",
    "role": "Wicketkeeper",
    "bat": 94,
    "bowl": 10,
    "ovr": 94,
    "basePrice": 2,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Nicholas Pooran",
    "country": "WI",
    "role": "Wicketkeeper",
    "bat": 93,
    "bowl": 10,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Quinton de Kock",
    "country": "SA",
    "role": "Wicketkeeper",
    "bat": 89,
    "bowl": 10,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Ishan Kishan",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 87,
    "bowl": 10,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Phil Salt",
    "country": "ENG",
    "role": "Wicketkeeper",
    "bat": 88,
    "bowl": 10,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Rahmanullah Gurbaz",
    "country": "AFG",
    "role": "Wicketkeeper",
    "bat": 84,
    "bowl": 10,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Jonny Bairstow",
    "country": "ENG",
    "role": "Wicketkeeper",
    "bat": 88,
    "bowl": 10,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Dinesh Karthik",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 85,
    "bowl": 10,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Wriddhiman Saha",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 82,
    "bowl": 10,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Jitesh Sharma",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 83,
    "bowl": 10,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Dhruv Jurel",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 82,
    "bowl": 10,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Anuj Rawat",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 78,
    "bowl": 10,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Kumar Kushagra",
    "country": "IND",
    "role": "Wicketkeeper",
    "bat": 75,
    "bowl": 10,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": []
  },
  {
    "name": "Jasprit Bumrah",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 96,
    "ovr": 96,
    "basePrice": 2,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Mitchell Starc",
    "country": "AUS",
    "role": "Fast Bowler",
    "bat": 35,
    "bowl": 93,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Pat Cummins",
    "country": "AUS",
    "role": "Fast Bowler",
    "bat": 60,
    "bowl": 92,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Captain Cool (⭐⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Kagiso Rabada",
    "country": "SA",
    "role": "Fast Bowler",
    "bat": 30,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 2,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Trent Boult",
    "country": "NZ",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 2,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Jofra Archer",
    "country": "ENG",
    "role": "Fast Bowler",
    "bat": 40,
    "bowl": 92,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Mohammed Shami",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 2,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Mohammed Siraj",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 89,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Arshdeep Singh",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Matheesha Pathirana",
    "country": "SL",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Lockie Ferguson",
    "country": "NZ",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Anrich Nortje",
    "country": "SA",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Mark Wood",
    "country": "ENG",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Josh Hazlewood",
    "country": "AUS",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "T Natarajan",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Avesh Khan",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 84,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Prasiddh Krishna",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 1,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Deepak Chahar",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 45,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Bhuvneshwar Kumar",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 35,
    "bowl": 86,
    "ovr": 86,
    "basePrice": 1,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Khaleel Ahmed",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 0.75,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Mukesh Kumar",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Mayank Yadav",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Harshit Rana",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 30,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Vaibhav Arora",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Gerald Coetzee",
    "country": "SA",
    "role": "Fast Bowler",
    "bat": 35,
    "bowl": 84,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Naveen-ul-Haq",
    "country": "AFG",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 1,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Alzarri Joseph",
    "country": "WI",
    "role": "Fast Bowler",
    "bat": 30,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 1,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Spencer Johnson",
    "country": "AUS",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 0.75,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Tushar Deshpande",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 0.75,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Yash Thakur",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Akash Deep",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 25,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Umran Malik",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 0.75,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Sandeep Sharma",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 84,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Mohit Sharma",
    "country": "IND",
    "role": "Fast Bowler",
    "bat": 20,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 1,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Nuwan Thushara",
    "country": "SL",
    "role": "Fast Bowler",
    "bat": 15,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Rashid Khan",
    "country": "AFG",
    "role": "Spinner",
    "bat": 55,
    "bowl": 95,
    "ovr": 95,
    "basePrice": 2,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Yuzvendra Chahal",
    "country": "IND",
    "role": "Spinner",
    "bat": 10,
    "bowl": 91,
    "ovr": 91,
    "basePrice": 2,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Kuldeep Yadav",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 92,
    "ovr": 92,
    "basePrice": 2,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Sunil Narine",
    "country": "WI",
    "role": "Spinner",
    "bat": 85,
    "bowl": 93,
    "ovr": 93,
    "basePrice": 2,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Varun Chakaravarthy",
    "country": "IND",
    "role": "Spinner",
    "bat": 10,
    "bowl": 89,
    "ovr": 89,
    "basePrice": 1.5,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Ravi Bishnoi",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Maheesh Theekshana",
    "country": "SL",
    "role": "Spinner",
    "bat": 15,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Adam Zampa",
    "country": "AUS",
    "role": "Spinner",
    "bat": 15,
    "bowl": 88,
    "ovr": 88,
    "basePrice": 1.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Noor Ahmad",
    "country": "AFG",
    "role": "Spinner",
    "bat": 15,
    "bowl": 85,
    "ovr": 85,
    "basePrice": 1,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Mujeeb Ur Rahman",
    "country": "AFG",
    "role": "Spinner",
    "bat": 15,
    "bowl": 84,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Rahul Chahar",
    "country": "IND",
    "role": "Spinner",
    "bat": 25,
    "bowl": 83,
    "ovr": 83,
    "basePrice": 1,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Amit Mishra",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Piyush Chawla",
    "country": "IND",
    "role": "Spinner",
    "bat": 30,
    "bowl": 84,
    "ovr": 84,
    "basePrice": 1,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Karn Sharma",
    "country": "IND",
    "role": "Spinner",
    "bat": 25,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Suyash Sharma",
    "country": "IND",
    "role": "Spinner",
    "bat": 10,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 0.75,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Mayank Markande",
    "country": "IND",
    "role": "Spinner",
    "bat": 15,
    "bowl": 81,
    "ovr": 81,
    "basePrice": 0.75,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Sai Kishore",
    "country": "IND",
    "role": "Spinner",
    "bat": 30,
    "bowl": 82,
    "ovr": 82,
    "basePrice": 0.75,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Manimaran Siddharth",
    "country": "IND",
    "role": "Spinner",
    "bat": 15,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Shreyas Gopal",
    "country": "IND",
    "role": "Spinner",
    "bat": 35,
    "bowl": 79,
    "ovr": 79,
    "basePrice": 0.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Murugan Ashwin",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Prashant Solanki",
    "country": "IND",
    "role": "Spinner",
    "bat": 15,
    "bowl": 75,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Kumar Kartikeya",
    "country": "IND",
    "role": "Spinner",
    "bat": 20,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Hrithik Shokeen",
    "country": "IND",
    "role": "Spinner",
    "bat": 30,
    "bowl": 77,
    "ovr": 77,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Mahipal Lomror",
    "country": "IND",
    "role": "Spinner",
    "bat": 75,
    "bowl": 65,
    "ovr": 70,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Swapnil Singh",
    "country": "IND",
    "role": "Spinner",
    "bat": 40,
    "bowl": 78,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Hardik Pandya",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 88,
    "bowl": 85,
    "ovr": 88,
    "basePrice": 2,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Andre Russell",
    "country": "WI",
    "role": "Fast Bowling Allrounder",
    "bat": 92,
    "bowl": 82,
    "ovr": 90,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      5,
      6,
      7
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Cameron Green",
    "country": "AUS",
    "role": "Fast Bowling Allrounder",
    "bat": 86,
    "bowl": 80,
    "ovr": 85,
    "basePrice": 1.5,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Marcus Stoinis",
    "country": "AUS",
    "role": "Fast Bowling Allrounder",
    "bat": 87,
    "bowl": 75,
    "ovr": 84,
    "basePrice": 1.5,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Sam Curran",
    "country": "ENG",
    "role": "Fast Bowling Allrounder",
    "bat": 80,
    "bowl": 86,
    "ovr": 84,
    "basePrice": 1.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Mitchell Marsh",
    "country": "AUS",
    "role": "Fast Bowling Allrounder",
    "bat": 86,
    "bowl": 78,
    "ovr": 83,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Romario Shepherd",
    "country": "WI",
    "role": "Fast Bowling Allrounder",
    "bat": 82,
    "bowl": 80,
    "ovr": 81,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "Nitish Kumar Reddy",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 83,
    "bowl": 75,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Emerging Player (⭐)",
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
    "name": "Marco Jansen",
    "country": "SA",
    "role": "Fast Bowling Allrounder",
    "bat": 75,
    "bowl": 85,
    "ovr": 81,
    "basePrice": 1,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Jason Holder",
    "country": "WI",
    "role": "Fast Bowling Allrounder",
    "bat": 75,
    "bowl": 82,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Ben Stokes",
    "country": "ENG",
    "role": "Fast Bowling Allrounder",
    "bat": 87,
    "bowl": 82,
    "ovr": 86,
    "basePrice": 2,
    "trait": "Chase Master (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Shivam Dube",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 85,
    "bowl": 60,
    "ovr": 80,
    "basePrice": 1.5,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Azmatullah Omarzai",
    "country": "AFG",
    "role": "Fast Bowling Allrounder",
    "bat": 80,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Vijay Shankar",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 80,
    "bowl": 70,
    "ovr": 76,
    "basePrice": 0.75,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Kyle Mayers",
    "country": "WI",
    "role": "Fast Bowling Allrounder",
    "bat": 85,
    "bowl": 75,
    "ovr": 82,
    "basePrice": 1,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Daryl Mitchell",
    "country": "NZ",
    "role": "Fast Bowling Allrounder",
    "bat": 86,
    "bowl": 65,
    "ovr": 81,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Deepak Hooda",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 82,
    "bowl": 65,
    "ovr": 78,
    "basePrice": 0.75,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Ramandeep Singh",
    "country": "IND",
    "role": "Fast Bowling Allrounder",
    "bat": 80,
    "bowl": 70,
    "ovr": 77,
    "basePrice": 0.75,
    "trait": "Finisher (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Ravindra Jadeja",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 85,
    "bowl": 88,
    "ovr": 87,
    "basePrice": 2,
    "trait": "Jack of All Trades (⭐⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Axar Patel",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 83,
    "bowl": 86,
    "ovr": 85,
    "basePrice": 1.5,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Glenn Maxwell",
    "country": "AUS",
    "role": "Spin Bowling Allrounder",
    "bat": 89,
    "bowl": 78,
    "ovr": 85,
    "basePrice": 2,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Washington Sundar",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 78,
    "bowl": 83,
    "ovr": 81,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
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
    "name": "Krunal Pandya",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 80,
    "bowl": 82,
    "ovr": 81,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      5,
      6
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Moeen Ali",
    "country": "ENG",
    "role": "Spin Bowling Allrounder",
    "bat": 84,
    "bowl": 80,
    "ovr": 83,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐)",
    "idealBattingPos": [
      3,
      4
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Shakib Al Hasan",
    "country": "BAN",
    "role": "Spin Bowling Allrounder",
    "bat": 83,
    "bowl": 85,
    "ovr": 84,
    "basePrice": 1.5,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Mitchell Santner",
    "country": "NZ",
    "role": "Spin Bowling Allrounder",
    "bat": 75,
    "bowl": 84,
    "ovr": 80,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Liam Livingstone",
    "country": "ENG",
    "role": "Spin Bowling Allrounder",
    "bat": 87,
    "bowl": 75,
    "ovr": 82,
    "basePrice": 1.5,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Wanindu Hasaranga",
    "country": "SL",
    "role": "Spin Bowling Allrounder",
    "bat": 78,
    "bowl": 89,
    "ovr": 85,
    "basePrice": 1.5,
    "trait": "Mystery Spinner (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "R Ashwin",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 75,
    "bowl": 87,
    "ovr": 83,
    "basePrice": 1.5,
    "trait": "Big Turner (⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "1-6",
      "7-15"
    ]
  },
  {
    "name": "Rahul Tewatia",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 84,
    "bowl": 70,
    "ovr": 78,
    "basePrice": 1,
    "trait": "Finisher (⭐⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Abhishek Sharma",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 88,
    "bowl": 70,
    "ovr": 82,
    "basePrice": 1.5,
    "trait": "Powerplay Destroyer (⭐⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Shahbaz Ahmed",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 78,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.75,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      6,
      7
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Harpreet Brar",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 70,
    "bowl": 80,
    "ovr": 77,
    "basePrice": 0.75,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Krishnappa Gowtham",
    "country": "IND",
    "role": "Spin Bowling Allrounder",
    "bat": 75,
    "bowl": 78,
    "ovr": 77,
    "basePrice": 0.5,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      7,
      8
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Rachin Ravindra",
    "country": "NZ",
    "role": "Spin Bowling Allrounder",
    "bat": 86,
    "bowl": 75,
    "ovr": 82,
    "basePrice": 1.5,
    "trait": "Anchor (⭐⭐)",
    "idealBattingPos": [
      1,
      2
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Sikandar Raza",
    "country": "ZIM",
    "role": "Spin Bowling Allrounder",
    "bat": 84,
    "bowl": 80,
    "ovr": 82,
    "basePrice": 1,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      4,
      5
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Harshal Patel",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 30,
    "bowl": 87,
    "ovr": 87,
    "basePrice": 1.5,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Sandeep Warrier",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 10,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Jaydev Unadkat",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 25,
    "bowl": 80,
    "ovr": 80,
    "basePrice": 0.75,
    "trait": "Death Bowling Specialist (⭐⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15",
      "16-20"
    ]
  },
  {
    "name": "Chetan Sakariya",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 15,
    "bowl": 79,
    "ovr": 79,
    "basePrice": 0.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6",
      "16-20"
    ]
  },
  {
    "name": "Rishi Dhawan",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 40,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Jack of All Trades (⭐⭐)",
    "idealBattingPos": [
      8,
      9
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Pradeep Sangwan",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 15,
    "bowl": 75,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Swing King (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Arjun Tendulkar",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 20,
    "bowl": 74,
    "ovr": 74,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "1-6"
    ]
  },
  {
    "name": "Darshan Nalkande",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 20,
    "bowl": 76,
    "ovr": 76,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      9,
      10
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Simarjeet Singh",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 15,
    "bowl": 78,
    "ovr": 78,
    "basePrice": 0.5,
    "trait": "Bouncer Specialist (⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  },
  {
    "name": "Basil Thampi",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 10,
    "bowl": 76,
    "ovr": 76,
    "basePrice": 0.5,
    "trait": "Yorker King (⭐⭐⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "16-20"
    ]
  },
  {
    "name": "M Shahrukh Khan",
    "country": "IND",
    "role": "Medium Pace Bowler",
    "bat": 20,
    "bowl": 75,
    "ovr": 75,
    "basePrice": 0.5,
    "trait": "Emerging Player (⭐)",
    "idealBattingPos": [
      10,
      11
    ],
    "idealBowlingOvers": [
      "7-15"
    ]
  }
,

  // --- Additional Indian Depth (20 players) ---
  { name: "Abhimanyu Easwaran", country: "IND", role: "Batsman", bat: 75, bowl: 12, ovr: 75, basePrice: 0.5, trait: "Emerging Player (⭐)", idealBattingPos: [1, 2], idealBowlingOvers: [] },
  { name: "Devdutt Padikkal V2", country: "IND", role: "Batsman", bat: 80, bowl: 10, ovr: 80, basePrice: 0.75, trait: "Spin Basher (⭐⭐)", idealBattingPos: [3, 4], idealBowlingOvers: [] },
  { name: "Sarfaraz Khan", country: "IND", role: "Batsman", bat: 76, bowl: 15, ovr: 76, basePrice: 0.5, trait: "Sweep Specialist (⭐⭐)", idealBattingPos: [4, 5], idealBowlingOvers: [] },
  { name: "Shahrukh Khan", country: "IND", role: "Batsman", bat: 78, bowl: 25, ovr: 78, basePrice: 1.0, trait: "Finisher (⭐⭐)", idealBattingPos: [5, 6], idealBowlingOvers: [] },
  { name: "Manish Pandey V2", country: "IND", role: "Batsman", bat: 79, bowl: 12, ovr: 79, basePrice: 1.0, trait: "Intent Merchant (⭐⭐)", idealBattingPos: [3, 4], idealBowlingOvers: [] },
  
  { name: "KS Bharat", country: "IND", role: "Wicketkeeper", bat: 74, bowl: 10, ovr: 74, basePrice: 0.5, trait: "Safe Hands (⭐)", idealBattingPos: [3, 4], idealBowlingOvers: [] },
  { name: "Upendra Yadav", country: "IND", role: "Wicketkeeper", bat: 72, bowl: 10, ovr: 72, basePrice: 0.5, trait: "Emerging Player (⭐)", idealBattingPos: [5, 6], idealBowlingOvers: [] },
  
  { name: "Prasidh Krishna", country: "IND", role: "Fast Bowler", bat: 15, bowl: 81, ovr: 81, basePrice: 1.0, trait: "Hit the Deck (⭐⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["1-6", "7-15"] },
  { name: "Navdeep Saini", country: "IND", role: "Fast Bowler", bat: 20, bowl: 77, ovr: 77, basePrice: 0.75, trait: "Express Pace (⭐⭐)", idealBattingPos: [9, 10], idealBowlingOvers: ["7-15", "16-20"] },
  { name: "Mohsin Khan", country: "IND", role: "Fast Bowler", bat: 15, bowl: 80, ovr: 80, basePrice: 1.0, trait: "Heavy Ball (⭐⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["1-6", "16-20"] },
  { name: "T Natarajan V2", country: "IND", role: "Medium Pace Bowler", bat: 22, bowl: 76, ovr: 76, basePrice: 0.75, trait: "Swing & Seam (⭐)", idealBattingPos: [9, 10], idealBowlingOvers: ["1-6"] },
  { name: "Kartik Tyagi", country: "IND", role: "Fast Bowler", bat: 15, bowl: 78, ovr: 78, basePrice: 0.75, trait: "Raw Pace (⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["7-15", "16-20"] },
  
  { name: "Varun Chakaravarthy V2", country: "IND", role: "Spinner", bat: 25, bowl: 79, ovr: 79, basePrice: 0.75, trait: "Leggie (⭐⭐)", idealBattingPos: [8, 9], idealBowlingOvers: ["7-15"] },
  { name: "Ravi Bishnoi V2", country: "IND", role: "Spinner", bat: 20, bowl: 77, ovr: 77, basePrice: 0.5, trait: "Googly Specialist (⭐)", idealBattingPos: [9, 10], idealBowlingOvers: ["7-15"] },
  { name: "Washington Sundar V2", country: "IND", role: "Spin Bowling Allrounder", bat: 65, bowl: 75, ovr: 70, basePrice: 0.5, trait: "Jack of All Trades (⭐)", idealBattingPos: [7, 8], idealBowlingOvers: ["7-15"] },
  
  { name: "Abdul Samad", country: "IND", role: "Fast Bowling Allrounder", bat: 75, bowl: 60, ovr: 68, basePrice: 0.5, trait: "Big Hitter (⭐)", idealBattingPos: [6, 7], idealBowlingOvers: ["7-15"] },
  { name: "Kedar Jadhav", country: "IND", role: "Spin Bowling Allrounder", bat: 77, bowl: 65, ovr: 71, basePrice: 1.0, trait: "Utility Player (⭐)", idealBattingPos: [3, 4], idealBowlingOvers: ["7-15"] },
  { name: "Vijay Shankar V2", country: "IND", role: "Spin Bowling Allrounder", bat: 75, bowl: 76, ovr: 75, basePrice: 1.0, trait: "Economical (⭐⭐)", idealBattingPos: [5, 6], idealBowlingOvers: ["7-15"] },
  { name: "Bhuvneshwar Kumar V2", country: "IND", role: "Fast Bowling Allrounder", bat: 65, bowl: 81, ovr: 73, basePrice: 1.5, trait: "Death Bowling Specialist (⭐⭐)", idealBattingPos: [8, 9], idealBowlingOvers: ["16-20"] },
  { name: "Shardul Thakur", country: "IND", role: "Fast Bowling Allrounder", bat: 70, bowl: 78, ovr: 74, basePrice: 1.5, trait: "Golden Arm (⭐⭐)", idealBattingPos: [7, 8], idealBowlingOvers: ["7-15", "16-20"] },

  // --- Additional Overseas Depth (10 players) ---
  { name: "Colin Munro", country: "SA", role: "Batsman", bat: 80, bowl: 10, ovr: 80, basePrice: 1.0, trait: "Power Hitter (⭐⭐)", idealBattingPos: [3, 4], idealBowlingOvers: [] },
  { name: "Jonny Bairstow V2", country: "ENG", role: "Batsman", bat: 82, bowl: 10, ovr: 82, basePrice: 1.5, trait: "Dynamic (⭐⭐)", idealBattingPos: [4, 5], idealBowlingOvers: [] },
  { name: "Josh Inglis", country: "AUS", role: "Wicketkeeper", bat: 78, bowl: 10, ovr: 78, basePrice: 0.75, trait: "Innovative (⭐)", idealBattingPos: [3, 4], idealBowlingOvers: [] },
  { name: "Jason Behrendorff", country: "AUS", role: "Fast Bowler", bat: 15, bowl: 79, ovr: 79, basePrice: 1.0, trait: "Powerplay Specialist (⭐⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["1-6"] },
  { name: "Trent Boult V2", country: "ENG", role: "Fast Bowler", bat: 20, bowl: 82, ovr: 82, basePrice: 1.5, trait: "Express Pace (⭐⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["7-15", "16-20"] },
  { name: "Adil Rashid", country: "AUS", role: "Spinner", bat: 25, bowl: 81, ovr: 81, basePrice: 1.0, trait: "Leggie (⭐⭐)", idealBattingPos: [9, 10], idealBowlingOvers: ["7-15"] },
  { name: "Akeal Hosein", country: "WI", role: "Spin Bowling Allrounder", bat: 60, bowl: 78, ovr: 69, basePrice: 0.75, trait: "Economical (⭐)", idealBattingPos: [8, 9], idealBowlingOvers: ["1-6", "7-15"] },
  { name: "Jason Holder V2", country: "WI", role: "Fast Bowling Allrounder", bat: 75, bowl: 74, ovr: 74, basePrice: 1.0, trait: "Finisher (⭐⭐)", idealBattingPos: [6, 7], idealBowlingOvers: ["16-20"] },
  { name: "Dasun Shanaka", country: "SL", role: "Fast Bowling Allrounder", bat: 76, bowl: 70, ovr: 73, basePrice: 0.75, trait: "Captain (⭐)", idealBattingPos: [5, 6], idealBowlingOvers: ["7-15"] },
  { name: "Fazalhaq Farooqi", country: "AFG", role: "Fast Bowler", bat: 20, bowl: 79, ovr: 79, basePrice: 1.0, trait: "Slower Ball Specialist (⭐⭐)", idealBattingPos: [10, 11], idealBowlingOvers: ["16-20"] }
];

const IPL_TEAMS = [
  {
    "id": "mumbai",
    "name": "Mumbai",
    "fullName": "Mumbai Champions",
    "primaryColor": "#004BA0",
    "secondaryColor": "#D1AB3E",
    "shortCode": "MUM"
  },
  {
    "id": "chennai",
    "name": "Chennai",
    "fullName": "Chennai Super Kings",
    "primaryColor": "#F9CD05",
    "secondaryColor": "#1D3557",
    "shortCode": "CHE"
  },
  {
    "id": "bengaluru",
    "name": "Bengaluru",
    "fullName": "Bengaluru Challengers",
    "primaryColor": "#DA1818",
    "secondaryColor": "#000000",
    "shortCode": "BLR"
  },
  {
    "id": "kolkata",
    "name": "Kolkata",
    "fullName": "Kolkata Knights",
    "primaryColor": "#3A225D",
    "secondaryColor": "#B3A125",
    "shortCode": "KOL"
  },
  {
    "id": "delhi",
    "name": "Delhi",
    "fullName": "Delhi Capitals",
    "primaryColor": "#17449E",
    "secondaryColor": "#DC0032",
    "shortCode": "DEL"
  },
  {
    "id": "ahmedabad",
    "name": "Ahmedabad",
    "fullName": "Ahmedabad Titans",
    "primaryColor": "#1B2133",
    "secondaryColor": "#B4975A",
    "shortCode": "AHM"
  },
  {
    "id": "lucknow",
    "name": "Lucknow",
    "fullName": "Lucknow Super Giants",
    "primaryColor": "#0057B8",
    "secondaryColor": "#E03A3E",
    "shortCode": "LKN"
  },
  {
    "id": "hyderabad",
    "name": "Hyderabad",
    "fullName": "Hyderabad Sunrisers",
    "primaryColor": "#F26522",
    "secondaryColor": "#000000",
    "shortCode": "HYD"
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "fullName": "Jaipur Royals",
    "primaryColor": "#EA1A85",
    "secondaryColor": "#004B8C",
    "shortCode": "JPR"
  },
  {
    "id": "chandigarh",
    "name": "Chandigarh",
    "fullName": "Chandigarh Kings",
    "primaryColor": "#ED1B24",
    "secondaryColor": "#DCDDDF",
    "shortCode": "CHD"
  }
];

module.exports = { PLAYER_TEMPLATES, IPL_TEAMS };
