/* rock = rock
rock < paper
rock > scissors
paper = paper
paper < scissors
scissors = scissors*/

/*computer gets assigned a random value*/
function getComputerChoice () {
    const computerChoice = Math.random ();

    if (computerChoice  < 0.33) {
        return "rock";
    } else if (computerChoice < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

/*human inputs a value*/
function getHumanChoice () {
    const humanChoice = prompt ("Enter your choice: rock, paper, or scissors");
    const choice = humanChoice.toLowerCase(); /*Convert the input to lowercase*/
    
    if (choice === "rock" || choice === "paper" || choice === "scissors") {
        return choice;
    } else {
        return "Invalid choice. Please enter rock, paper, or scissors.";
    }
}

/*declare scores*/
let computerScore = 0;
let humanScore = 0

/* compare ComputerChoice and HumanChoice per round*/
function playRound(computerChoice, humanChoice) {
  if (computerChoice === humanChoice) {
    return `It's a tie! You both chose ${humanChoice}. Computer score: ${computerScore}–Your score: ${humanScore}`; 
  }

  if (
    (computerChoice === "rock" && humanChoice === "paper") || (computerChoice === "scissors" && humanChoice === "rock") || (computerChoice === "paper" && humanChoice === "scissors") 
    ) {
        humanScore++;
        return `You won this round! The computer chose ${computerChoice} and you chose ${humanChoice}. Computer score: ${computerScore}–Your score: ${humanScore}`;
    } else {
        computerScore++; 
        return `You lost this round! The computer chose ${computerChoice} and you chose ${humanChoice}. Computer score: ${computerScore}–Your score: ${humanScore}`;
    }
}

/*loop the game 5 times*/
for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    console.log(playRound(computerChoice, humanChoice));
}

/*final result*/
if (computerScore === humanScore) {
    console.log(`It's a tie! Computer score: ${computerScore} – Your score: ${humanScore}`);
} else if (computerScore < humanScore) {
    console.log(`You won! Computer score: ${computerScore} – Your score: ${humanScore}`);
} else {
    console.log(`Computer won! Computer score: ${computerScore} – Your score: ${humanScore}`);
}
