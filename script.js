"use strict";

let randomDiceNumber;
let activePlayer = 0;
let currentScore = 0;

const elements = document.querySelectorAll(".num");
const rollBtn = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const currentScoreElementGetter = function (activePlayerNumber) {
  const currentScoreElement = document.querySelector(
    `#current--${activePlayerNumber}`
  );
  return currentScoreElement;
};

const updateCurrentScore = function () {
  currentScore += randomDiceNumber;
  const currentScoreEl = currentScoreElementGetter(activePlayer);
  currentScoreEl.textContent = currentScore;
};

const changeDiceUI = function () {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(`num${randomDiceNumber}`)) {
      elements[i].style.visibility = "visible";
    } else {
      elements[i].style.visibility = "hidden";
    }
  }
  updateCurrentScore();
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

rollBtn.addEventListener("click", rollTheDice);
