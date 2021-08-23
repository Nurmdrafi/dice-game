'use strict';
// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0')
const current1 = document.querySelector('#current--1')

// Starting Conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0; // Current Score 0
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Rolling Dice Function

btnRoll.addEventListener('click', function () {
    if (playing) {

        // 1. Generating a random dice roll
        const number = Math.trunc(Math.random() * 6) + 1;
        console.log(number);

        // 2. Display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${number}.png`
        /*
            switch (number) {
                case 1:
                    dice.src = 'dice-1.png';
                    break;
                case 2:
                    dice.src = 'dice-2.png';
                    break;
                case 3:
                    dice.src = 'dice-3.png';
                    break;
                case 4:
                    dice.src = 'dice-4.png';
                    break;
                case 5:
                    dice.src = 'dice-5.png';
                    break;
                case 6:
                    dice.src = 'dice-6.png';
                    break;
            }
        */
        // 3. Check for rolled 1; if true, switch to next player
        if (number !== 1) {
            // Add doce to current score;
            /*
            1. We should not store data only in the DOM;
            2. We need a variable to store data;
            3. Not in function have to store Globally.
            4. let currentScore = 0;
            */
            // currentScore = currentScore + number;
            currentScore += number;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            /*
            Manipulate Id dynamically to find out, Which is the active player right now?
            */
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});
// Holding Current Score
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[activePlayer] = scores[activePlayer] + currentScore;
        // scores[1] = scores[1] + currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score >= 100
        if (scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            dice.classList.add('hidden');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// New Game Button Function
btnNew.addEventListener('click', init)

//=====//
//Note// // Switch active player //
//====//

/*

const current0 = document.querySelector('#current--0')
const current1 = document.querySelector('#current--1')

const scores = [0, 0]; // [player 1 score, player 2 score]
let currentScore = 0;
let activePlayer = 0;

function() =>
document.getElementById(`current--${activePlayer}`).textContent = currentScore;

activePlayer = activePlayer === 0 ? 1 : 0;
*/