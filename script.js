"use strict";

let randomDiceNumber;
let activePlayer = 0;
let currentScore = 0;
const score = [0, 0];

const elements = document.querySelectorAll(".num");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

const currentScoreElementGetter = function () {
  const currentScoreElement = document.querySelector(
    `#current--${activePlayer}`
  );
  return currentScoreElement;
};

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

const updateCurrentScore = function (holdScore = false) {
  currentScore =
    holdScore || randomDiceNumber === 1 ? 0 : currentScore + randomDiceNumber;
  const currentScoreEl = currentScoreElementGetter(activePlayer);
  currentScoreEl.textContent = currentScore;
  (holdScore || randomDiceNumber === 1) && switchPlayer();
};

const updateTotalScore = function () {
  score[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];
};

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

const rollTheDice = function () {
  randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.style.animation = "none";
  dice.style.animation = "rotation 0.3s infinite ease-in";
  setTimeout(() => {
    dice.style.animation = "none";
    changeDiceUI();
  }, 1000);
};

const handleHoldScore = function () {
  updateTotalScore();
  updateCurrentScore(true);
};

rollBtn.addEventListener("click", rollTheDice);
holdBtn.addEventListener("click", handleHoldScore);
