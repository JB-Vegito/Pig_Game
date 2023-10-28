'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore, activePlayer, nonactivePlayer, playing;


//  Starting Conditions

const init = function(){    

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    nonactivePlayer = 1;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    nonactivePlayer = nonactivePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');    
};

//  Rolling dice

btnRoll.addEventListener('click', function(){
    
    if (playing){

    //  Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;


    //  Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`

    //  Checked if rolled dice is 1, and switch to next player if true
    if(dice !== 1){

        //  Add score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    }
    else{

        //  Switch player
        switchPlayer();

    }
}
});


btnHold.addEventListener('click', function(){

    if (playing){
        //  Add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //  Check if player won
        if (scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.getElementById(`name--${activePlayer}`).textContent = "WINNER";
            document.getElementById(`name--${nonactivePlayer}`).textContent = "LOSER";
        }
        else{
            switchPlayer();
        }    
    }
});


btnNew.addEventListener('click', init);