// create game content ( 7 * 6 )
const game_content = document.querySelector('.game_content');

for ( let i = 1; i <= 42; i++ ) {
    const circle = document.createElement('div');

    if ( i >= 1 && i <= 7 )
        circle.classList.add('input');

        circle.classList.add('cell');
        game_content.appendChild(circle);
    }


// create localstorage for scores
JSON.parse(localStorage.getItem('scores')) === null ?  localStorage.setItem('scores', JSON.stringify({player_1: 0, player_2: 0})) : '';
