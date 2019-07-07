// Your JavaScript goes here!
const moves = [`rock`, `paper`, `scissors`];
let number_of_rounds = 0;
let playerScore = 0;
let computerScore = 0;
const container = document.querySelector('.grid-container');

const scoreboard = container.querySelector('.scoreboard');
const playerScoreContainer = scoreboard.querySelector('#scoreboard-scores--player');
const computerScoreContainer = scoreboard.querySelector('#scoreboard-scores--computer');
const roundCounter = scoreboard.querySelector('#scoreboard-round--counter');

playerScoreContainer.textContent = `${playerScore}`;
computerScoreContainer.textContent = `${computerScore}`;
roundCounter.textContent = `${number_of_rounds}`;

function updateScoreboard(outcome) {
    roundCounter.textContent = `${number_of_rounds}`;
    if (outcome == "player") {
        playerScoreContainer.textContent = `${playerScore}`;
    } else if (outcome == "computer") {
        computerScoreContainer.textContent = `${computerScore}`;
    } else {
        return;
    }
}

const buttons = container.querySelectorAll(".btn");
buttons.forEach((button)=> {
    button.addEventListener('click', (e) =>{
        let playerMove = e.target.getAttribute('id')
        console.log(game(playerMove));
    });
})


// Plays RPS Game NUMBER_OF_ROUNDS times and outputs winner based on most number of round wins
function game(playerMove){
    let winner;
    let computerMove = computerPlay();
    playerMove = (playerMove == 'random') ? randomPlay() : playerMove;
        
    let roundOutcome = playRound(playerMove, computerMove);
    switch(roundOutcome) {
        case(`player`):
            playerScore += 1;
            break;
        case(`computer`):
            computerScore += 1;
            break;
        case(`tie`):
            break;
    }
    number_of_rounds += 1;
    updateScoreboard(roundOutcome);

    // winner = setGameWinner(playerScore, computerScore);

    // if (winner == `tie`) {
    //     return `Wow, close one! You tied. ${playerScore} vs. ${computerScore}`
    // } else {
    //     return (winner == `player`) ? `You won! ${playerScore} vs. ${computerScore}` : `You lost... ${playerScore} vs. ${computerScore}`
    // }
}

// Returns game winner
function setGameWinner(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return `player`;
    } else if (computerScore > playerScore) {
        return `computer`;
    } else {
        return `tie`;
    }
}

// Initiates single round of RPS and returns round outcome
function playRound(playerMove, computerMove){ 
    // Pseudocode below
    // if both same, then tie
    // if player rock and computer paper, then computer win, else player wins
    // if player not rock and player is paper, and computer is scissors, then computer wins, else player wins
    // if not rock or paper, then player must be scissors. if computer rock, then computer wins, else player wins
    
    let roundOutcome = `computer`; //default value
    
    if (playerMove === computerMove) {
        roundOutcome = `tie`;
    } else if (playerMove == `rock` && computerMove == `scissors`) {
        roundOutcome = `player`;
    } else if (playerMove == `paper` && computerMove == `rock`) {
        roundOutcome = `player`;
    } else if (playerMove == `scissors` && computerMove == `paper`) {
        roundOutcome = `player`;
    }
    return roundOutcome;
}

// Sets player move to case-insensitive value of either `rock` | `paper` | `scissors`
function setPlayerMove(playerMove) {
    if (!(playerMove === null) && validatePlayerMove(playerMove)) {
        if (playerMove == `random`) {
            return randomPlay();
        } else {
            return playerMove.toLowerCase();
        }
    }
    alert(`Player move must be rock, paper, scissors, or random.`);
    return playerMove;
}

// checks that it is a valid player move
function validatePlayerMove(playerMove){
    if (typeof playerMove == `string`) {
        let downcasedPlayerMove = playerMove.toLowerCase();
        return ((downcasedPlayerMove == `rock`) || (downcasedPlayerMove == `paper`) || (downcasedPlayerMove == `scissors`) || (downcasedPlayerMove == `random`))
    }
    return false;
    }

// Prompts user for their move and returns value
function getPlayerMove() {
    return playerMove = window.prompt(`Make your move! (rock, paper, scissors, or random)`,`random`);
}

// Random RPS move 
function computerPlay(){
    return randomPlay();
}

// Random RPS move
function randomPlay(){
    return randomArrayPick(moves);
}

// Picks a random value from an array.
function randomArrayPick(array){
    let randomChoice = array[Math.floor(Math.random()*array.length)];
    return randomChoice;
}