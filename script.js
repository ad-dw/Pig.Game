"use strict";

let randomDiceNumber;
let activePlayer = 0;
let currentScore = 0;

//This is the final score for both players.
const score = [0, 0];

//Indicates if the game is going on or not.
let playing = true;

//selected all necssary DOM elements in one place not to repeat this code
const elements = document.querySelectorAll(".num");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

//provides the current score DOM element for active player
const currentScoreElementGetter = function () {
  const currentScoreElement = document.querySelector(
    `#current--${activePlayer}`
  );
  return currentScoreElement;
};

//switches the player
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

//Declares win once any player wins and changes UI accordigly.
const declareWin = function () {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  rollBtn.disabled = true;
  holdBtn.disabled = true;
};

//updates current score of active player
const updateCurrentScore = function (holdScore = false) {
  currentScore =
    holdScore || randomDiceNumber === 1 ? 0 : currentScore + randomDiceNumber;
  const currentScoreEl = currentScoreElementGetter(activePlayer);
  currentScoreEl.textContent = currentScore;
  if (holdScore || randomDiceNumber === 1) {
    playing && switchPlayer();
  }
};

//updates total score of the active player
const updateTotalScore = function () {
  score[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];
  if (currentScore >= 100) {
    declareWin();
  }
};

//changes the dice UI once dice is rolled
const changeDiceUI = function () {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(`num${randomDiceNumber}`)) {
      elements[i].style.visibility = "visible";
    } else {
      elements[i].style.visibility = "hidden";
    }
  }
  updateCurrentScore(false);
};

//generates random dice roll and does dice animation
const rollTheDice = function () {
  rollBtn.disabled = true;
  randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.style.animation = "none";
  dice.style.animation = "rotation 0.3s infinite ease-in";
  setTimeout(() => {
    dice.style.animation = "none";
    changeDiceUI();
    rollBtn.disabled = false;
  }, 1000);
};

//handles hold score feature
const handleHoldScore = function () {
  updateTotalScore();
  updateCurrentScore(true);
};

//adding the event listeners to roll dice & hold score buttons
rollBtn.addEventListener("click", rollTheDice);

holdBtn.addEventListener("click", handleHoldScore);
