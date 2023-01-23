import { changePlayersColor } from './utilis.js';
import { nextRound } from './index.js';

// Declare Variables
const start_btn = document.getElementById("start_btn");
const continue_btn = document.getElementById("continue_btn");
const controlls_btns = document.querySelectorAll('.controlls button');
const media = document.querySelector('audio');
// const overlay = document.querySelector('.overlay');
let isMute = true;


// Listeners
start_btn.addEventListener('click', onClickStart);
continue_btn.addEventListener('click', onClickContinue);
controlls_btns.forEach(e => e.addEventListener('click', onClickConroller));

init();

function init() {
    if (!sessionStorage.getItem('color'))
        sessionStorage.setItem('color', 'red')

    if (sessionStorage.getItem('color') === 'red') {
        controlls_btns[1].classList.add('active');
    }
    if (sessionStorage.getItem('color') === 'yellow') {
        controlls_btns[2].classList.add('active');
    }
    if (sessionStorage.getItem('mute') === 'true') {
        controlls_btns[0].classList.add('active');
    }
}

function onClickStart() {
    // reset scores
    localStorage.removeItem('scores');
    nextRound();
    moveToPage('game_page');
}

function onClickContinue() {
    nextRound();
    moveToPage('game_page');
}


export function moveToPage(_page) {
    const otherPage = document.getElementById(_page);
    const currPage = document.getElementById(_page === 'menu_page' ? 'game_page' : 'menu_page' );

    if ( _page === 'game_page' ) {
        currPage.classList.add('active');
        otherPage.classList.add('active');
    } else {
        currPage.classList.remove('active');
        otherPage.classList.remove('active');
    }
}

function onClickConroller(e) {
    let element = e.target;

    if ( element.getAttribute('src') !== null )
        element = e.target.parentElement;
    
    if ( element.dataset.select === 'red' ) {
        controlls_btns[1].classList.add('active');
        controlls_btns[2].classList.remove('active');
        sessionStorage.setItem('color', element.dataset.select);
        changePlayersColor('red');
    }

    if ( element.dataset.select === 'yellow' ) {
        controlls_btns[2].classList.add('active');
        controlls_btns[1].classList.remove('active');
        sessionStorage.setItem('color', element.dataset.select);
        changePlayersColor('yellow');
    }

    if ( element.dataset.select === 'sound' ) {
        controlls_btns[0].classList.toggle('active');
        isMute = !isMute;
        playMusic();
    }
}

function playMusic() {
    if ( !isMute ) media.play();
    else  media.pause();
}