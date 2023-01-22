import { onClickInputCell } from './utilis.js';
import Player from './player.js';
import { playBot } from './_bot.js';
import { urlRoute } from './route.js';

/* variables */
export const cells = document.querySelectorAll('.game_content .cell');
const inputs = document.querySelectorAll('.game_content .input');
const roundCounter_container = document.querySelector('.turn_countdown');
const roundCounter = document.querySelector('.turn_countdown h1');
const roundCounterPlayer = document.querySelector('.turn_countdown span');
export const player_score_1 = document.querySelectorAll('.player_score_1 h1');
export const player_score_2 = document.querySelectorAll('.player_score_2 h1');
const controll_btns = document.querySelectorAll('.game .controllers button');

/* Load Scores */
for (let i = 0; i < 2; i++) {
    player_score_1[i].textContent = JSON.parse(localStorage.getItem('scores'))?.player_1 || 0;
    player_score_2[i].textContent = JSON.parse(localStorage.getItem('scores'))?.player_2 || 0;
}

/* Rules */
export const Rules = {
    gamePaused: false,
    roundTime: 8,
};
let isMyTurn = true;
export let roundCounterinterval;
let time = Rules.roundTime;

/* Players */
const selectedColor = sessionStorage.getItem('color');
export const player_1 = new Player('player 1', selectedColor || 'red');
export const player_2 = new Player('player 2', selectedColor === 'yellow' ? 'red' : 'yellow');

/* change round container color */
roundCounter_container.style.backgroundColor = player_1.getColor() === 'red' ? '#FF5722' : '#FFC107';

/* Play RealPlayer */
inputs.forEach((element, ind) => {
    element.addEventListener('click', () => {
        if ( !isMyTurn || Rules.gamePaused ) return;
        
        isMyTurn = false;
        onClickInputCell(ind);
        nextRound();

        // Bot Turn To Play
        BotTurn();
    })
});

controll_btns[0].addEventListener('click', () => urlRoute('/'));
controll_btns[1].addEventListener('click', Restart);

/* 
    Bot Turn Functions
    to start bot turn
*/
function BotTurn() {
    if (isMyTurn) return;

    setTimeout(() => {
        if ( !Rules.gamePaused )
            playBot();
            isMyTurn = true;
            nextRound();
    }, 3000);
}

/* 
    Counter Functions
    start round time interval
*/
export function counter() {
    roundCounterinterval = setInterval(() => {
        roundCounter.textContent = time-- + "s";
        
        if ( time === -2 ) {
            isMyTurn = !isMyTurn;
            BotTurn();
            nextRound();
        }
    }, 1111);
}

/* 
    Next Round Functions
    reset round time and change player round tag
*/
function nextRound() {
    time = Rules.roundTime;
    roundCounter.textContent = Rules.roundTime + "s";

    if ( isMyTurn ) {
        roundCounter_container.style.backgroundColor = player_1.getColor() === 'red' ? '#FF5722' : '#FFC107';
        roundCounterPlayer.textContent = "PLAYER 1'S TURN";
    }
    else {
        roundCounter_container.style.backgroundColor = player_2.getColor() === 'yellow' ? '#FFC107' : '#FF5722';
        roundCounterPlayer.textContent = "PLAYER 2'S TURN";
    }
}

/* 
    Restart Functions
    to restart the game
*/
function Restart() {
    location.reload();
    sessionStorage.setItem('musicTime', 0);
}