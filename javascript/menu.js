// Declare Variables
const start_btn = document.getElementById("start_btn");
const continue_btn = document.getElementById("continue_btn");
const controlls_btns = document.querySelectorAll('.controlls button');
const media = document.querySelector('audio');
// const overlay = document.querySelector('.overlay');
let isMute = JSON.parse(sessionStorage.getItem('mute')) !== null ? JSON.parse(sessionStorage.getItem('mute')) : true;


// Listeners
start_btn.addEventListener('click', onClickStart);
continue_btn.addEventListener('click', onClickContinue);
controlls_btns.forEach(e => e.addEventListener('click', onClickConroller));


init();

// Functions
function onClickStart() {
    // reset scores
    localStorage.removeItem('scores');

    
    location.href = "/game.html";
}

function onClickContinue() {
    location.href = "/game.html";
}

function onClickConroller(e) {
    let element = e.target;

    if ( element.getAttribute('src') !== null )
        element = e.target.parentElement;
    
    if ( element.dataset.select === 'red' ) {
        controlls_btns[1].classList.add('active');
        controlls_btns[2].classList.remove('active');
        sessionStorage.setItem('color', element.dataset.select);
    }

    if ( element.dataset.select === 'yellow' ) {
        controlls_btns[2].classList.add('active');
        controlls_btns[1].classList.remove('active');
        sessionStorage.setItem('color', element.dataset.select);
    }

    if ( element.dataset.select === 'sound' ) {
        controlls_btns[0].classList.toggle('active');
        isMute = !isMute;
        sessionStorage.setItem('mute', isMute);
        playMusic();
    }
}

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

function playMusic() {
    if ( sessionStorage.getItem('mute') === 'false' || !sessionStorage.getItem('mute') ) {
        media.play();
        
        setInterval(() => {
            console.log(Math.ceil(media.currentTime))
            sessionStorage.setItem('musicTime', Math.ceil(media.currentTime));

            if ( media.paused && (sessionStorage.getItem('mute') === 'false' || !sessionStorage.getItem('mute')) ) {
                media.load();
                media.play();
            }
        }, 1000)
    } else {
        media.pause();
    }
}