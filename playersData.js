// Player base dataset with inspired-by-real-IPL-stars attributes, traits, and realistic stats
// Categories: Batsman, Wicketkeeper, Fast Bowler, Fast Bowling Allrounder, Spin Bowling Allrounder, Spinner, Medium Pace Bowler
// Special traits: Finisher, Chase Master, Yorker King, Mystery Spinner, Powerplay Destroyer, Jack of All Trades, Lightning Gloves, Anchor, Swing Wizard, Death Over Specialist, Googly Master, Captain Cool, Pinch Hitter, Laser Fielder, Sheet Anchor, etc.

const PLAYER_TEMPLATES = [
  // Batsmen
  { name: "Virat Kolhi", country: "IND", role: "Batsman", bat: 98, bowl: 35, ovr: 96, basePrice: 2.0, trait: "Chase Master" },
  { name: "Rohit Sharman", country: "IND", role: "Batsman", bat: 95, bowl: 30, ovr: 93, basePrice: 2.0, trait: "Powerplay Destroyer" },
  { name: "Suryakumar Yadavji", country: "IND", role: "Batsman", bat: 96, bowl: 25, ovr: 94, basePrice: 2.0, trait: "360 Degree Innovator" },
  { name: "Shubman Gil", country: "IND", role: "Batsman", bat: 91, bowl: 20, ovr: 89, basePrice: 2.0, trait: "Anchor" },
  { name: "David Warnor", country: "AUS", role: "Batsman", bat: 92, bowl: 22, ovr: 90, basePrice: 2.0, trait: "Powerplay Destroyer" },
  { name: "Travis Hede", country: "AUS", role: "Batsman", bat: 94, bowl: 45, ovr: 91, basePrice: 2.0, trait: "Powerplay Destroyer" },
  { name: "Rinku Sinhe", country: "IND", role: "Batsman", bat: 89, bowl: 20, ovr: 87, basePrice: 1.5, trait: "Finisher" },
  { name: "Yashasvi Jaiswal", country: "IND", role: "Batsman", bat: 92, bowl: 25, ovr: 90, basePrice: 1.5, trait: "Fearless Hitter" },
  { name: "Ruturaj Gaikwad", country: "IND", role: "Batsman", bat: 89, bowl: 20, ovr: 88, basePrice: 1.5, trait: "Sheet Anchor" },
  { name: "Faf du Plessy", country: "SA", role: "Batsman", bat: 88, bowl: 22, ovr: 87, basePrice: 1.5, trait: "Captain Cool" },
  { name: "Shimron Hetmyre", country: "WI", role: "Batsman", bat: 86, bowl: 15, ovr: 84, basePrice: 1.0, trait: "Death Over Blaster" },
  { name: "Rajat Patidar", country: "IND", role: "Batsman", bat: 86, bowl: 20, ovr: 85, basePrice: 1.0, trait: "Spin Destroyer" },
  { name: "Sai Sudharsan", country: "IND", role: "Batsman", bat: 85, bowl: 20, ovr: 84, basePrice: 1.0, trait: "Anchor" },
  { name: "Kane Williams", country: "NZ", role: "Batsman", bat: 87, bowl: 30, ovr: 86, basePrice: 1.5, trait: "Crisis Man" },
  { name: "Devdutt Padikkal", country: "IND", role: "Batsman", bat: 82, bowl: 15, ovr: 80, basePrice: 0.75, trait: "Stroke Maker" },
  { name: "Prithvi Shawe", country: "IND", role: "Batsman", bat: 83, bowl: 15, ovr: 81, basePrice: 0.75, trait: "Pinch Hitter" },
  { name: "Abhishek Sharman", country: "IND", role: "Batsman", bat: 90, bowl: 65, ovr: 88, basePrice: 1.5, trait: "Powerplay Destroyer" },
  { name: "Tilak Varma", country: "IND", role: "Batsman", bat: 87, bowl: 40, ovr: 85, basePrice: 1.0, trait: "Middle Order Anchor" },
  { name: "Jake Fraser", country: "AUS", role: "Batsman", bat: 91, bowl: 20, ovr: 88, basePrice: 1.5, trait: "Powerplay Destroyer" },
  { name: "Glenn Phillip", country: "NZ", role: "Batsman", bat: 87, bowl: 60, ovr: 85, basePrice: 1.0, trait: "Laser Fielder" },
  { name: "Shashank Singhe", country: "IND", role: "Batsman", bat: 84, bowl: 25, ovr: 83, basePrice: 0.5, trait: "Finisher" },

  // Wicketkeepers (Explicit Category)
  { name: "MS Dhonee", country: "IND", role: "Wicketkeeper", bat: 92, bowl: 10, ovr: 94, basePrice: 2.0, trait: "Captain Cool" },
  { name: "Jos Butlor", country: "ENG", role: "Wicketkeeper", bat: 95, bowl: 20, ovr: 94, basePrice: 2.0, trait: "Finisher" },
  { name: "Heinrich Klaasen", country: "SA", role: "Wicketkeeper", bat: 95, bowl: 20, ovr: 93, basePrice: 2.0, trait: "Spin Smasher" },
  { name: "Rishabh Pant", country: "IND", role: "Wicketkeeper", bat: 93, bowl: 20, ovr: 92, basePrice: 2.0, trait: "Lightning Gloves" },
  { name: "Sanju Samzen", country: "IND", role: "Wicketkeeper", bat: 90, bowl: 20, ovr: 89, basePrice: 2.0, trait: "Fearless Hitter" },
  { name: "KL Rahool", country: "IND", role: "Wicketkeeper", bat: 91, bowl: 20, ovr: 90, basePrice: 2.0, trait: "Sheet Anchor" },
  { name: "Nicholas Pooran", country: "WI", role: "Wicketkeeper", bat: 91, bowl: 18, ovr: 89, basePrice: 2.0, trait: "Finisher" },
  { name: "Ishan Kishon", country: "IND", role: "Wicketkeeper", bat: 87, bowl: 20, ovr: 86, basePrice: 1.5, trait: "Pocket Dynamo" },
  { name: "Philip Salt", country: "ENG", role: "Wicketkeeper", bat: 89, bowl: 15, ovr: 87, basePrice: 1.5, trait: "Fast Starter" },
  { name: "Quinton de Kock", country: "SA", role: "Wicketkeeper", bat: 88, bowl: 15, ovr: 86, basePrice: 1.5, trait: "Power Striker" },
  { name: "Rahmanullah Gurbaz", country: "AFG", role: "Wicketkeeper", bat: 83, bowl: 15, ovr: 82, basePrice: 0.75, trait: "Fearless Opener" },
  { name: "Jitesh Sharman", country: "IND", role: "Wicketkeeper", bat: 84, bowl: 15, ovr: 83, basePrice: 0.75, trait: "Finisher" },
  { name: "Dhruv Jurel", country: "IND", role: "Wicketkeeper", bat: 85, bowl: 15, ovr: 84, basePrice: 0.75, trait: "Lightning Gloves" },
  { name: "Tristan Stubbs", country: "SA", role: "Wicketkeeper", bat: 88, bowl: 35, ovr: 86, basePrice: 1.0, trait: "360 Degree Innovator" },

  // Fast Bowling Allrounders
  { name: "Hardik Pandiya", country: "IND", role: "Fast Bowling Allrounder", bat: 90, bowl: 88, ovr: 92, basePrice: 2.0, trait: "Jack of All Trades" },
  { name: "Andre Russelle", country: "WI", role: "Fast Bowling Allrounder", bat: 94, bowl: 87, ovr: 93, basePrice: 2.0, trait: "Muscle Finisher" },
  { name: "Cameron Grene", country: "AUS", role: "Fast Bowling Allrounder", bat: 88, bowl: 84, ovr: 87, basePrice: 2.0, trait: "Jack of All Trades" },
  { name: "Marcus Stoinis", country: "AUS", role: "Fast Bowling Allrounder", bat: 89, bowl: 83, ovr: 87, basePrice: 1.5, trait: "Hulk Finisher" },
  { name: "Sam Curron", country: "ENG", role: "Fast Bowling Allrounder", bat: 83, bowl: 87, ovr: 86, basePrice: 2.0, trait: "Death Over Specialist" },
  { name: "Mitchell Marz", country: "AUS", role: "Fast Bowling Allrounder", bat: 87, bowl: 81, ovr: 85, basePrice: 1.5, trait: "Pinch Hitter" },
  { name: "Romario Shephard", country: "WI", role: "Fast Bowling Allrounder", bat: 84, bowl: 82, ovr: 83, basePrice: 0.75, trait: "Finisher" },
  { name: "Shivam Dubey", country: "IND", role: "Fast Bowling Allrounder", bat: 91, bowl: 68, ovr: 87, basePrice: 1.5, trait: "Spin Smasher" },
  { name: "Nitish Reddy", country: "IND", role: "Fast Bowling Allrounder", bat: 84, bowl: 80, ovr: 83, basePrice: 0.75, trait: "Jack of All Trades" },
  { name: "Marco Jansen", country: "SA", role: "Fast Bowling Allrounder", bat: 78, bowl: 88, ovr: 85, basePrice: 1.5, trait: "Bounce Extractor" },
  { name: "Jason Holdor", country: "WI", role: "Fast Bowling Allrounder", bat: 79, bowl: 84, ovr: 82, basePrice: 1.0, trait: "Crisis Man" },
  { name: "Shardul Thakre", country: "IND", role: "Fast Bowling Allrounder", bat: 76, bowl: 83, ovr: 81, basePrice: 1.0, trait: "Golden Arm" },

  // Spin Bowling Allrounders
  { name: "Ravindra Jadeya", country: "IND", role: "Spin Bowling Allrounder", bat: 88, bowl: 92, ovr: 92, basePrice: 2.0, trait: "Jack of All Trades" },
  { name: "Axar Pateel", country: "IND", role: "Spin Bowling Allrounder", bat: 87, bowl: 90, ovr: 90, basePrice: 2.0, trait: "Economical Choker" },
  { name: "Glenn Maxwel", country: "AUS", role: "Spin Bowling Allrounder", bat: 91, bowl: 80, ovr: 88, basePrice: 2.0, trait: "Big Show" },
  { name: "Sunil Narine", country: "WI", role: "Spin Bowling Allrounder", bat: 89, bowl: 94, ovr: 93, basePrice: 2.0, trait: "Mystery Spinner" },
  { name: "Wanindu Hasaranga", country: "SL", role: "Spin Bowling Allrounder", bat: 78, bowl: 91, ovr: 87, basePrice: 1.5, trait: "Googly Master" },
  { name: "Ravi Chandran Ashwin", country: "IND", role: "Spin Bowling Allrounder", bat: 80, bowl: 89, ovr: 86, basePrice: 1.5, trait: "Carrom Ball" },
  { name: "Moeen Alee", country: "ENG", role: "Spin Bowling Allrounder", bat: 85, bowl: 83, ovr: 85, basePrice: 1.5, trait: "Power Striker" },
  { name: "Krunal Pandiya", country: "IND", role: "Spin Bowling Allrounder", bat: 81, bowl: 84, ovr: 83, basePrice: 1.0, trait: "Economical Choker" },
  { name: "Washington Sundor", country: "IND", role: "Spin Bowling Allrounder", bat: 80, bowl: 84, ovr: 82, basePrice: 1.0, trait: "Powerplay Choker" },
  { name: "Liam Livingston", country: "ENG", role: "Spin Bowling Allrounder", bat: 88, bowl: 78, ovr: 85, basePrice: 1.5, trait: "Monster Sixes" },
  { name: "Will Jacks", country: "ENG", role: "Spin Bowling Allrounder", bat: 87, bowl: 75, ovr: 84, basePrice: 1.0, trait: "Fast Starter" },
  { name: "Rahul Tewatia", country: "IND", role: "Spin Bowling Allrounder", bat: 86, bowl: 76, ovr: 83, basePrice: 1.0, trait: "Iceman Finisher" },

  // Fast Bowlers
  { name: "Jasprit Bumrah", country: "IND", role: "Fast Bowler", bat: 30, bowl: 99, ovr: 98, basePrice: 2.0, trait: "Yorker King" },
  { name: "Mitchell Starc", country: "AUS", role: "Fast Bowler", bat: 55, bowl: 95, ovr: 94, basePrice: 2.0, trait: "Yorker King" },
  { name: "Pat Cumminz", country: "AUS", role: "Fast Bowler", bat: 75, bowl: 94, ovr: 92, basePrice: 2.0, trait: "Captain Cool" },
  { name: "Trent Boulte", country: "NZ", role: "Fast Bowler", bat: 30, bowl: 93, ovr: 91, basePrice: 2.0, trait: "Powerplay Wrecker" },
  { name: "Mohammed Shamee", country: "IND", role: "Fast Bowler", bat: 25, bowl: 94, ovr: 92, basePrice: 2.0, trait: "Seam Master" },
  { name: "Mohammed Siraj", country: "IND", role: "Fast Bowler", bat: 20, bowl: 91, ovr: 89, basePrice: 2.0, trait: "Fiery Bouncer" },
  { name: "Kagiso Rabada", country: "SA", role: "Fast Bowler", bat: 40, bowl: 92, ovr: 90, basePrice: 2.0, trait: "Express Pace" },
  { name: "Arshdeep Sinhe", country: "IND", role: "Fast Bowler", bat: 20, bowl: 90, ovr: 88, basePrice: 1.5, trait: "Death Over Specialist" },
  { name: "Matheesha Pathirana", country: "SL", role: "Fast Bowler", bat: 15, bowl: 93, ovr: 91, basePrice: 1.5, trait: "Slinga Yorker" },
  { name: "Anrich Nortje", country: "SA", role: "Fast Bowler", bat: 20, bowl: 90, ovr: 87, basePrice: 1.5, trait: "150kph Bullet" },
  { name: "Lockie Fergusone", country: "NZ", role: "Fast Bowler", bat: 25, bowl: 88, ovr: 86, basePrice: 1.0, trait: "Express Pace" },
  { name: "Avesh Khane", country: "IND", role: "Fast Bowler", bat: 20, bowl: 87, ovr: 85, basePrice: 1.0, trait: "Death Over Specialist" },
  { name: "Mayank Yadave", country: "IND", role: "Fast Bowler", bat: 15, bowl: 91, ovr: 88, basePrice: 1.0, trait: "155kph Lightning" },
  { name: "Harshit Ranah", country: "IND", role: "Fast Bowler", bat: 35, bowl: 87, ovr: 85, basePrice: 1.0, trait: "Slower Ball Magician" },
  { name: "Gerald Coetzee", country: "SA", role: "Fast Bowler", bat: 45, bowl: 87, ovr: 85, basePrice: 1.0, trait: "Fiery Bouncer" },
  { name: "Josh Hazlewood", country: "AUS", role: "Fast Bowler", bat: 20, bowl: 93, ovr: 90, basePrice: 2.0, trait: "Laser Accuracy" },
  { name: "Tushar Deshpande", country: "IND", role: "Fast Bowler", bat: 20, bowl: 84, ovr: 82, basePrice: 0.75, trait: "Wicket Hunter" },
  { name: "Vaibhav Arora", country: "IND", role: "Fast Bowler", bat: 18, bowl: 83, ovr: 81, basePrice: 0.5, trait: "Inswing Specialist" },

  // Medium Pace Bowlers
  { name: "Harshal Pateel", country: "IND", role: "Medium Pace Bowler", bat: 55, bowl: 90, ovr: 88, basePrice: 1.5, trait: "Purple Cap Hunter" },
  { name: "Mohit Sharman", country: "IND", role: "Medium Pace Bowler", bat: 25, bowl: 88, ovr: 86, basePrice: 1.0, trait: "Knuckle Ball Wizard" },
  { name: "Deepak Chahar", country: "IND", role: "Medium Pace Bowler", bat: 60, bowl: 88, ovr: 87, basePrice: 1.5, trait: "Swing Wizard" },
  { name: "Bhuvneshwar Kumor", country: "IND", role: "Medium Pace Bowler", bat: 45, bowl: 89, ovr: 88, basePrice: 1.5, trait: "Swing Wizard" },
  { name: "Sandeep Sharman", country: "IND", role: "Medium Pace Bowler", bat: 20, bowl: 88, ovr: 86, basePrice: 1.0, trait: "Death Slower Ball" },
  { name: "Khaleel Ahmed", country: "IND", role: "Medium Pace Bowler", bat: 15, bowl: 86, ovr: 84, basePrice: 1.0, trait: "Left Arm Angler" },
  { name: "Mukesh Kumor", country: "IND", role: "Medium Pace Bowler", bat: 20, bowl: 86, ovr: 84, basePrice: 1.0, trait: "Blockhole Machine" },
  { name: "Mustafizur Rahmon", country: "BAN", role: "Medium Pace Bowler", bat: 15, bowl: 89, ovr: 87, basePrice: 1.5, trait: "Fizz Cutter" },
  { name: "Yash Dayal", country: "IND", role: "Medium Pace Bowler", bat: 15, bowl: 85, ovr: 83, basePrice: 0.75, trait: "Crisis Overcomer" },

  // Spinners
  { name: "Rashid Khann", country: "AFG", role: "Spinner", bat: 75, bowl: 98, ovr: 96, basePrice: 2.0, trait: "Mystery Spinner" },
  { name: "Yuzvendra Chahall", country: "IND", role: "Spinner", bat: 15, bowl: 94, ovr: 92, basePrice: 2.0, trait: "Chess Grandmaster" },
  { name: "Kuldeep Yadaw", country: "IND", role: "Spinner", bat: 35, bowl: 95, ovr: 93, basePrice: 2.0, trait: "Chinaman Magician" },
  { name: "Varun Chakravarthi", country: "IND", role: "Spinner", bat: 20, bowl: 92, ovr: 90, basePrice: 1.5, trait: "Mystery Spinner" },
  { name: "Ravi Bishnoy", country: "IND", role: "Spinner", bat: 20, bowl: 89, ovr: 87, basePrice: 1.5, trait: "Googly Master" },
  { name: "Maheesh Theekshana", country: "SL", role: "Spinner", bat: 20, bowl: 88, ovr: 86, basePrice: 1.0, trait: "Carrom Ball" },
  { name: "Noor Ahmade", country: "AFG", role: "Spinner", bat: 20, bowl: 88, ovr: 86, basePrice: 1.0, trait: "Mystery Spinner" },
  { name: "Suyash Sharmann", country: "IND", role: "Spinner", bat: 15, bowl: 83, ovr: 81, basePrice: 0.5, trait: "Quick Legbreak" },
  { name: "Adam Zampa", country: "AUS", role: "Spinner", bat: 20, bowl: 89, ovr: 87, basePrice: 1.5, trait: "Googly Master" },
  { name: "Mayank Markande", country: "IND", role: "Spinner", bat: 20, bowl: 83, ovr: 81, basePrice: 0.5, trait: "Googly Master" },
  { name: "Rahul Chahar", country: "IND", role: "Spinner", bat: 25, bowl: 85, ovr: 83, basePrice: 0.75, trait: "Aggressive Leggie" },
  { name: "Sai Kishore", country: "IND", role: "Spinner", bat: 30, bowl: 86, ovr: 84, basePrice: 0.75, trait: "Height & Bounce" },

  // Emerging / Wildcards
  { name: "Angkrish Raghuvanshi", country: "IND", role: "Batsman", bat: 83, bowl: 30, ovr: 81, basePrice: 0.5, trait: "Fearless Hitter" },
  { name: "Sameer Rizvee", country: "IND", role: "Batsman", bat: 82, bowl: 25, ovr: 80, basePrice: 0.5, trait: "Finisher" },
  { name: "Nandre Burger", country: "SA", role: "Fast Bowler", bat: 25, bowl: 88, ovr: 86, basePrice: 0.75, trait: "150kph Bullet" },
  { name: "Nuwan Thushara", country: "SL", role: "Fast Bowler", bat: 15, bowl: 87, ovr: 85, basePrice: 0.75, trait: "Slinga Yorker" },
  { name: "Spencer Johnson", country: "AUS", role: "Fast Bowler", bat: 20, bowl: 86, ovr: 84, basePrice: 0.75, trait: "Express Pace" },
  { name: "Tanush Kotian", country: "IND", role: "Spin Bowling Allrounder", bat: 78, bowl: 80, ovr: 80, basePrice: 0.5, trait: "Jack of All Trades" },
  { name: "Ramandeep Singhe", country: "IND", role: "Fast Bowling Allrounder", bat: 83, bowl: 79, ovr: 82, basePrice: 0.5, trait: "Death Over Blaster" },
  { name: "Nehal Wadhera", country: "IND", role: "Batsman", bat: 84, bowl: 30, ovr: 82, basePrice: 0.5, trait: "Crisis Man" },
  { name: "Ayush Badonee", country: "IND", role: "Batsman", bat: 84, bowl: 35, ovr: 82, basePrice: 0.5, trait: "Finisher" }
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
