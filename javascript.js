// DOM Elements
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--main-primary-color");

// DOM Elements
const playerChoices = document.querySelectorAll("#player-choices button");
const computerChoices = document.querySelectorAll("#computer-choices .choice");
const resultMessage = document.getElementById("result-message");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const roundElement = document.getElementById("round");
const nextRoundBtn = document.getElementById("next-round");
const resetBtn = document.getElementById("reset");

// Game Variables
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
const maxRounds = 5;
let isRoundActive = true; // Tracks if the round is active

// Function to get computer's random choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to highlight the active choice
function highlightChoice(choice, user) {
  const buttons = user === "player" ? playerChoices : computerChoices;
  buttons.forEach(button => {
    button.style.opacity = button.id === choice ? "1" : "0.5";
    button.style.backgroundColor = button.id === choice ? primaryColor.trim() : ""; // Highlight the active choice
  });
}

// Function to reset active styles
function resetActiveStyles() {
  playerChoices.forEach(button => {
    button.style.opacity = "1";
    button.style.backgroundColor = "";
  });
  computerChoices.forEach(button => {
    button.style.opacity = "0.5";
    button.style.backgroundColor = "";
  });
}

// Function to determine the winner of the round
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }
  return "computer";
}

// Function to update scores
function updateScores(winner) {
  if (winner === "player") playerScore++;
  if (winner === "computer") computerScore++;

  // Update score elements in the DOM
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Function to display round result
function displayRoundResult(winner, playerChoice, computerChoice) {
  if (winner === "draw") {
    resultMessage.innerHTML = `It's a draw! You both chose <strong>${playerChoice}</strong>.`;
  } else if (winner === "player") {
    resultMessage.innerHTML = `You won this round! <strong>${playerChoice[0].toUpperCase()}${playerChoice.slice(1)}</strong> beats <strong>${computerChoice}</strong>.`;
  } else {
    resultMessage.innerHTML = `You lost this round! <strong>${computerChoice[0].toUpperCase()}${computerChoice.slice(1)}</strong> beats <strong>${playerChoice}</strong>.`;
  }
}

// Function to declare the overall game winner
function declareGameWinner() {
  if (playerScore > computerScore) {
    resultMessage.textContent = "🎉 You won the game! 🎉";
  } else if (computerScore > playerScore) {
    resultMessage.textContent = "😢 You lost the game! Better luck next time! 😢";
  } else {
    resultMessage.textContent = "It's a tie! Great match!";
  }
  nextRoundBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
}

// Function to handle player's choice
function handlePlayerChoice(playerChoice) {
  if (!isRoundActive || currentRound === maxRounds) return; // Prevent interaction if the round is over or inactive

  isRoundActive = false; // Disable further interactions for this round

  // Disable hover effect by adding the 'no-hover' class
  document.getElementById("player-choices").classList.add("no-hover");

  // Highlight player's choice
  highlightChoice(playerChoice, "player");

  // Get computer's choice
  const computerChoice = getComputerChoice();
  highlightChoice(computerChoice, "computer");

  // Determine the winner and update scores
  const roundWinner = determineWinner(playerChoice, computerChoice);
  updateScores(roundWinner);

  // Display round result
  displayRoundResult(roundWinner, playerChoice, computerChoice);

  // Increment round count
  currentRound++;
  roundElement.textContent = `${currentRound} / ${maxRounds}`;

  // Show "Next Round" button or end the game
  if (currentRound < maxRounds) {
    nextRoundBtn.style.display = "inline-block";
  } else {
    declareGameWinner();
  }
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;
  isRoundActive = true;

  // Reset scores and result message
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  roundElement.textContent = `${currentRound} / ${maxRounds}`;
  resultMessage.textContent = "Choose Rock, Paper, or Scissors to begin.";

  // Reset styles and hide buttons
  resetActiveStyles();
  nextRoundBtn.style.display = "none";
  resetBtn.style.display = "none";
}

// Event Listeners for Player Choices
playerChoices.forEach(button => {
  button.addEventListener("click", () => {
    handlePlayerChoice(button.id);
  });
});

//Event Listener for "Next Round"
nextRoundBtn.addEventListener("click", () => {
  resetActiveStyles();
  resultMessage.textContent = "Make your next choice!";
  nextRoundBtn.style.display = "none";
  isRoundActive = true; // Re-enable interaction for the new round
  document.getElementById("player-choices").classList.remove("no-hover");
});

// Event Listener for "Reset" button
resetBtn.addEventListener("click", resetGame);