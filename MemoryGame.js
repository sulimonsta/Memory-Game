const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let shuffledColors = shuffle(COLORS);
let canFlip = true;
let firstCard, secondCard;
let matches = 0;
let attempts = 0;
let score = 0;

// Shuffle function
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Function to create and set up card divs
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", "hidden", color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Function to handle card clicks
function handleCardClick(event) {
  if (!canFlip) return;

  const card = event.target;

  if (card === firstCard) return; // Prevent double-clicking the same card

  card.classList.remove("hidden");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    attempts++;
    canFlip = false;

    if (firstCard.classList[2] === secondCard.classList[2]) {
      // Cards match
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      score++;
      setTimeout(() => {
        firstCard = null;
        secondCard = null;
        canFlip = true;
      }, 1000);
    } else {
      // Cards do not match
      setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        firstCard = null;
        secondCard = null;
        canFlip = true;
      }, 1000);
    }
  }

  if (matches === COLORS.length / 2) {
    alert(`Congratulations! You won with ${attempts} attempts!`);
  }

  updateScore();
}

// Function to update the score display
function updateScore() {
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `Score: ${score}`;
}

// Start button click handler
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  gameContainer.innerHTML = "";
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  canFlip = true;
  firstCard = null;
  secondCard = null;
  matches = 0;
  attempts = 0;
  score = 0;
  updateScore();
});

// Initial setup
createDivsForColors(shuffledColors);
