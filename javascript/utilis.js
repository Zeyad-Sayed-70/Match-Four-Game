import { player_1, player_2, cells, player_score_1, player_score_2, Rules, counter, roundCounterinterval } from './index.js';
import {createGridRows, createGridColumns, createDianlogGrid, createReverseDianlogGrid} from './grid.js';

export function onClickInputCell(ind) {
    cellFlow(player_1, ind);
};

/* Play Music Function */
export function playMusic() {
    const media = document.querySelector('audio');
    if ( sessionStorage.getItem('mute') === 'false' || !sessionStorage.getItem('mute') ) {
        media.currentTime = parseInt(sessionStorage.getItem('musicTime')) || 0;
        media.play();
    }
}

/* Start Game Function */
export function Start() {
    counter();
}

/* Start Button (To Play Music and Start Game) */
const overlay = document.querySelector('.overlay');
overlay.children[0].addEventListener('click', () => {
    Start();    
    playMusic();
    overlay.remove();
})
overlay.children[1].addEventListener('click', () => {
    location.href = '/index.html';
})

/* 
    Cell Flow Function
    refers to cell flow animation to target index
    @params (_player: "player", _ind: "target index (in column)")
*/
export function cellFlow(_player, _ind) {
    // Add new Cell
    let i = 0;

    let interval = setInterval(() => {
        const cur = _ind+(7*(Math.max(i-1, 0)));
        const next = _ind+(7*i);

        if ( i === 1 )
            cells[cur].classList.add(_player.getColor() === 'red' ? 'red' : 'yellow');
        
        if ( !cells[next].classList.contains('red') && !cells[next].classList.contains('yellow') ) {
            cells[cur].classList.remove(_player.getColor() === 'red' ? 'red' : 'yellow');
            cells[next].classList.add(_player.getColor() === 'red' ? 'red' : 'yellow');
        } else {
            cells[cur].classList.add(_player.getColor() === 'red' ? 'red' : 'yellow');
            clearInterval(interval);
            const arr = [...createGridRows(), ...createGridColumns(), ...createDianlogGrid(), ...createReverseDianlogGrid()];
            console.log(checkWin(arr))
            if ( checkWin(arr) != null )
                winCelebrate(checkWin(arr));
            }
            
            i++;
            
            if ( i === 6 ) {
                clearInterval(interval);
                const arr = [...createGridRows(), ...createGridColumns(), ...createDianlogGrid(), ...createReverseDianlogGrid()];
                if ( checkWin(arr) != null )
                    winCelebrate(checkWin(arr));
            }

    }, 300);
}

/* 
    Check Win Function
    Checking any player win at specific grid direction (col or row or dar)
    @params (_grid: "grid that will be checked")
*/
export function checkWin(_grid) {
    let red = 0;
    let yellow = 0;

    for ( let i = 0; i < _grid.length; i++ ) {
        red = 0;
        yellow = 0;
        for  (let j = 0; j < _grid[i].length; j++) {
            if ( _grid[i][j].classList.contains('red') ) {
                red++;
                yellow = 0;
            } else if (_grid[i][j].classList.contains('yellow')) {
                yellow++;
                red = 0;
            } else {
                yellow = 0;
                red = 0;
            } 

            if ( red >= 4 ) return 'red';
            if ( yellow >= 4 ) return 'yellow';
        }
    }

    return null;
}

/* 
    Win Celebrate Function
    it means two things, firstly stop a whole game, secondly show win dialog
    @params (winner: "winnder player color (red or yellow)")
*/
function winCelebrate(winner) {
    const scores = JSON.parse(localStorage.getItem('scores'));
    const winnerDialog = document.querySelector('.winner_dialog');
    const winnerPlayer = document.querySelector('.winner_dialog span');
    
    // show Winner Dialog
    winnerDialog.classList.add('active');
    winnerPlayer.textContent = `${player_1.getColor() === winner ? player_1.getName() : player_2.getName()} is Winner!`

    let interval;
    interval = setInterval(() => {
        // for ( let i = 0; i < 2; i++ ) {
            // make party confetti
            party.confetti(winnerDialog, {
                count: party.variation.range(40, 80),
            });
        // }
    }, 1000);

    // when press Done Button
    winnerDialog.children[1].addEventListener('click', () => {
        // Close Winner Dialog
        winnerDialog.classList.remove('active');
        // stop party interval
        clearInterval(interval);
    })

    if ( player_1.getColor() === winner ) {
        // alert(`Congratulations, ${winner} is Winner!!`);
        // pause the game
        Rules.gamePaused = true;
        
        // +1 score to winner
        scores.player_1 += 1;
        console.log(scores)
        
        // save new scores
        localStorage.setItem('scores', JSON.stringify(scores));
        
        // update scores display
        player_score_1[0].textContent = scores.player_1;
        player_score_1[1].textContent = scores.player_1;
        
        // pause round counter
        clearInterval(roundCounterinterval);
    }
    
    if ( player_2.getColor() === winner ) {
        // alert(`Congratulations, ${winner} is Winner!!`);
        // pause the game
        Rules.gamePaused = true;
        
        // +1 score to winner
        scores.player_2 += 1;
        console.log(scores)
        
        // save new scores
        localStorage.setItem('scores', JSON.stringify(scores));
        
        // update scores display
        player_score_2[0].textContent = scores.player_2;
        player_score_2[1].textContent = scores.player_2;
        
        // pause round counter
        clearInterval(roundCounterinterval);
    }
}

