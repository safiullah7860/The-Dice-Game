"use strict";
// Selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
let playing = true;
let activePlayer = 1;
let currentScore = 0;
let scores = [0, 0];
score0El.textContent = 0;
let winner;
score1El.textContent = 0;
const diceEl = document.querySelector(".dice");
diceEl.classList.add("hidden");
document.querySelector(".btn--new").addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  scores = [0, 0];
  current1El.textContent = 0;
  playing = true;
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player1EL.classList.remove("active--active");
  player0EL.classList.remove("active--active");
  player0EL.classList.add("active--active");
});
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (playing) {
    let x = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    document.querySelector(".dice").src = `dice-${x}.png`;
    if (x == 1 && activePlayer == 1) {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = 0; //give control to user1
      //player1EL.classList.toggle('player--active'); //toggling both ensure only one is turned at a time
      //player0EL.classList.toggle('player--active'); //changes color based on who's turn it is
    } else if (x == 1 && activePlayer == 0) {
      document.querySelector(`#current--${activePlayer}`).textContent = 0; //changes current score to 0
      currentScore = 0;
      activePlayer = 1; //give control to user2
      //player0EL.classList.toggle('player--active'); //changes color based on who's turn it is
      //player1EL.classList.toggle('player--active'); //toggling both ensure only one is turned at a time
    } else {
      currentScore += x;
      //scores[activePlayer] += currentScore;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    if (scores[activePlayer] > 20) {
      //if player wins
      playing = false;
      winner = activePlayer;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.toggle("hidden");
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove("player--winner");
      diceEl.classList.add("hidden");
    }
    if (activePlayer == 1) activePlayer = 0;
    else if (activePlayer == 0) activePlayer = 1;
  }
});
