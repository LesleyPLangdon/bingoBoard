// Arrays to fill in with specific entries
const battleGroundStates = [     // Battleground states like "Trump wins Florida", "Harris wins Michigan"
    "Arizona",
    "Georgia",
    "Michigan",
    "Nevada",
    "North Carolina",
    "Pennsylvania",
    "Wisconsin"
];  
const otherStates = [ "Alabama", "Alaska", "Arkansas", "California", "Colorado",
"Connecticut", "Delaware", "Florida", "Hawaii", "Idaho", 
"Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", 
"Maryland", "Massachusetts", "Minnesota", "Mississippi", 
"Missouri", "Montana", "Nebraska", "New Hampshire", "New Jersey", 
"New Mexico", "New York", "North Dakota", "Ohio", 
"Oklahoma", "Oregon", "Rhode Island", "South Carolina", 
"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", 
"Washington", "West Virginia", "Wyoming"];            // Non-battleground states entries
const states = [
    "Arizona",
    "Michigan",
    "Montana",
    "Nevada",
    "Ohio",
    "Pennsylvania",
    "Texas",
    "West Virginia",
    "Wisconsin",
    "Florida",
    "Nebraska",
    "Maryland"
];

const candidates = [
    ["Gallego", "Lake"],       // Arizona
    ["Slotkin", "Rogers"],     // Michigan
    ["Tester", "Sheehy"],      // Montana
    ["Rosen", "Brown"],        // Nevada
    ["Brown", "Moreno"],       // Ohio
    ["Casey", "McCormick"],    // Pennsylvania
    ["Allred", "Cruz"],        // Texas
    ["Elliott", "Justice"],    // West Virginia
    ["Baldwin", "Hovde"],      // Wisconsin
    ["Mucarsel-Powell", "Scott"], // Florida
    ["Osborn", "Fischer"],      // Nebraska
    ["Alsobrooks", "Hogan"]     // Maryland
];

const racesToWatch = [];

for (let i = 0; i < states.length; i++) {
    // Select a random candidate from the candidates array for the current state
    const randomIndex = Math.floor(Math.random() * candidates[i].length);
    const selectedCandidate = candidates[i][randomIndex];

    // Concatenate the result into the racesToWatch array
    racesToWatch.push(`${selectedCandidate} wins ${states[i]}`);
}
const otherEvents = [
    "Trump declares victory before polls close",
    "Four states called by AP before 7:30 PM",
    "Major news network projects a presidential candidate's win with only 5% of the vote counted",
    "Unexpected ballot counting issues delay results in a swing state",
    "A state is called incorrectly by CNN, FOX, or MSNBC and has to be retracted",
    "A third party presidential candidate wins electoral college vote(s)",
    "Electoral college margin within 10 votes with only 3 states reporting",
    "Electoral college projections show a tie at 11 PM",
    "Electoral college count reaches 270 before midnight",
    "Electoral college margin over 10 votes at 10pm",
    "Electoral college margin over 10 votes at midnight",
    "Electoral college margin less than 10 votes at 2am Wednesday",
    "Electoral college margin less than 10 votes at 8am Wednesday",

];          // Surprise elements like "Third-party victory", "Polling error", "Record turnout"

const finalMargin = [
    "Trump by less than 20 EC votes",
    "Trump by 20 - 60 EC votes",
    "Trump by more than 60 EC votes",
    "Harris by less than 20 EC votes",
    "Harris by 20 - 60 EC votes",
    "Harris by more than 60 EC votes",
    
]

// Define candidate prefixes
const trumpPrefix = "Trump wins ";
const harrisPrefix = "Harris wins ";


// Populate finalBingoEntries by pulling random entries from each array
const addCandidatePrefix = (entry) => {
    return isTrumpWinning ? trumpPrefix + entry : harrisPrefix + entry;
};

// Final array to store 24 selected elements
const finalBingoEntries = [];

// Number of entries to pull from each array
const numRacesToWatch = 5;
const numOtherEvents = 4;
const numFinalMargin = 1;

// Pull entries and add candidate prefixes
// Function to shuffle and assign wins
function assignWins(states) {
    // Shuffle states to randomize the selection
    const shuffledStates = states.slice(); // Make a copy to avoid modifying the original
    
    for (let i = shuffledStates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledStates[i], shuffledStates[j]] = [shuffledStates[j], shuffledStates[i]];
    }
    
    // Assign wins
    const finalBingoEntries = [];
    let trumpWins = []
    let harrisWins = []
    if (shuffledStates.length == 7) {
    trumpWins = shuffledStates.slice(0, 3); // Trump wins 3 states
    harrisWins = shuffledStates.slice(3, 7); // Harris wins 4 states
} else {
    trumpWins = shuffledStates.slice(0, 4); // Trump wins 4 states
    harrisWins = shuffledStates.slice(4, 7); // Harris wins 3 states
}
    // Add entries to the finalBingoEntries array
    finalBingoEntries.push(...trumpWins.map(state => trumpPrefix + state));
    finalBingoEntries.push(...harrisWins.map(state => harrisPrefix + state));

    return finalBingoEntries;
}

function getRandomEntries(array, numEntries) {
    const selectedEntries = [];
    const arrayCopy = [...array]; // Make a copy to avoid modifying the original array
    
    for (let i = 0; i < numEntries; i++) {
        if (arrayCopy.length === 0) break; // Avoid errors if the array has fewer items than requested

        // Select a random index from the array copy
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);
        selectedEntries.push(arrayCopy[randomIndex]);

        // Remove the selected entry from the array copy
        arrayCopy.splice(randomIndex, 1);
    }
    return selectedEntries;
}
// Generate the bingo entries for battleground states
// const finalBingoBattleground = assignWins(battleGroundStates);
// const finalBingoStates = assignWins(otherStates);
// Display the final bingo entries for debugging purposes
console.log(finalBingoEntries);
finalBingoEntries.push(...assignWins(battleGroundStates))
finalBingoEntries.push(...assignWins(otherStates))
finalBingoEntries.push(...getRandomEntries(racesToWatch, numRacesToWatch));
finalBingoEntries.push(...getRandomEntries(otherEvents, numOtherEvents));
finalBingoEntries.push(...getRandomEntries(finalMargin, numFinalMargin));

// Display the final bingo entries for debugging purposes
console.log(finalBingoEntries);
// Array of possible bingo entries


function generateBingoCard() {

    
    // Make a copy of the bingo entries to avoid modifying the original array
    const entriesCopy = [...finalBingoEntries];
    const selectedEntries = [];


    // Select 24 unique random items
    while (selectedEntries.length < 25) {
        const randomIndex = Math.floor(Math.random() * entriesCopy.length);
        const entry = entriesCopy.splice(randomIndex, 1)[0];
        selectedEntries.push(entry);
    }

    // Loop through each cell by ID and replace the text with a selected entry
    for (let i = 1; i < 25; i++) {
        const cell = document.getElementById(`${i}`);
         // Check if cell exists before trying to update it
         if (cell) {
            cell.textContent = selectedEntries[i-1];
        } else {
            console.error(`Cell with ID ${i} not found.`);
        }
    }
    
     // Add event listener for the whole table
     const table = document.getElementById('bingoTable'); // Make sure to give your table an ID
     table.addEventListener('click', function(event) {
         // Check if the clicked element is a table cell
         if (event.target.tagName === 'TD') {
             // Change the cell's background color to white and text color to black
             event.target.style.backgroundColor = 'white';
             event.target.style.color = 'black';
         }
     });
}
function resetBingoCard() {
    const table = document.getElementById('bingoTable');
    for (let i = 1; i <= 24; i++) {
        const cell = document.getElementById(`${i}`);
        if (cell) {
            cell.style.backgroundColor = ''; // Reset background color
            cell.style.color = ''; // Reset text color
        }
    }
    const midCell = document.getElementById('free');
    midCell.style.backgroundColor = ''; // Reset background color
    midCell.style.color = ''; // Reset text color
}
