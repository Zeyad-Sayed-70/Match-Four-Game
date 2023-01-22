/* 
    How Bot Works?

    Bot Disessions in Order.
    1- Check Its Win (real player lose).
    2- Check Its Lose (real player win).
    3- play close to win.
    4- play random (in beginning).
*/

import { player_1, player_2 } from './index.js';
import { 
    cellFlow,

    checkWin,
} from './utilis.js';
import { createGridColumns, createGridRows } from './grid.js'; 

// Bot Play (Main)
export function playBot() {
    if (playLoseOrWin() === null)
        if ( playClose() === null )
            playFirstStip();
}

// Random Play (Rule 4)
function playFirstStip() {
    const random_ind = Math.floor(Math.random() * 7);
    playBotIn(random_ind);
}

// Play Close (Rule 3)
function playClose() {
    let ind = playClose_column() !== null ? playClose_column() : playClose_row() === null ? null : playClose_row();
    
    if ( ind === null ) return null;
    
    playBotIn(ind);
}

function playClose_column() {
    const grid = createGridColumns();

    // store row profit with his index {index: profit}
    let profit = {};

    // calc the profits
    for (let i = 0; i < grid.length; i++) {
        // if the column is full just skip it to next one
        if ( grid[i][0].classList.contains(player_1.getColor()) || grid[i][0].classList.contains(player_2.getColor()))
            continue;

        for (let j = 0; j < grid[i].length; j++) {
            if ( grid[i][j].classList.contains(player_1.getColor()) )
                break;

            if ( grid[i][j].classList.contains(player_2.getColor()) ) {
                profit[i] = profit[i] === undefined ? 1 : profit[i]++;
            }
        }
    }

    if ( Object.keys(profit).length === 0 ) return null;

    // get the column witch has max profit
    let max = 0;
    let ind = null;
    Object.values(profit).map((e, i) => {
        if ( e > max ) {
            max = e;
            ind = i;
        }
    })

    // return the suitable index to input bot cell
    return parseInt(Object.keys(profit)[ind]);
}

function playClose_row() {
    let grid = createGridRows();
    
    // profit to store bot cells count in each row 
    let profit = [];

    // calc bot profits in each row
    for (let i = grid.length-1; i >= 0; i--) {
        for (let j = 0; j < grid[i].length; j++) {
            if ( grid[i][j].classList.contains(player_2.getColor()) ) {
                profit[i] = profit[i] === undefined ? 1 : profit[i]++;
            }
        }
    }

    if ( profit.length === 0 ) return null;

    // get the row witch has max profit
    let max = 0;
    let ind = null;
    profit.map((e, i) => {
        if ( e > max ) {
            max = e;
            ind = i;
        }
    })
    
    // find suitable place to flow the cell
    let suitInd = null;
    for (let i = 0; i < grid[ind].length; i++) {
        if ( grid[ind][i].classList.contains(player_2.getColor()) ) {
            if ( i-1 >= 0 && (!grid[ind][i-1]?.classList.contains(player_2.getColor()) && !grid[ind][i-1]?.classList.contains(player_1.getColor())) )
                suitInd = i-1;
            
            if ( i+1 <= 5 && (!grid[ind][i+1]?.classList.contains(player_2.getColor()) && !grid[ind][i+1]?.classList.contains(player_1.getColor())) )
                suitInd = i+1;
        }
    }
        
    if ( suitInd === null ) return null;

    // return the suitable index to input bot cell
    return parseInt(suitInd)
}

// Play Bot Lose or Win
function playLoseOrWin() {
    let ind = checkBotWin() !== null ? checkBotWin() : checkBotLose() === null ? null : checkBotLose();
    
    if ( ind === null ) return null;
    
    playBotIn(ind);
}

// Check Bot Lose (Rule 2)
function checkBotLose() {
    let grid = createGridColumns();

    for ( let i = 0; i < grid.length; i++ ) {
        // if the column is full just skip it to next one
        if ( grid[i][0].classList.contains(player_1.getColor()) || grid[i][0].classList.contains(player_2.getColor()))
            continue;

        for ( let j = 0; j < grid[i].length; j++ ) {
            let p1 = grid[i][j].classList.contains(player_1.getColor());
            let p2 = grid[i][j].classList.contains(player_2.getColor());

            if ( !p1 && !p2 ) {
                // add player 1 class to this cell
                grid[i][j].classList.add(player_1.getColor());
                
                // check win after add p1 class
                if ( checkWin(grid) != null ) {
                    // remove player 1 class from cell after checking
                    console.log(i, checkWin(grid), 'lose', grid)
                    grid[i][j].classList.remove(player_1.getColor());
                    return i;
                }
                
                // remove player 1 class from cell after checking
                grid[i][j].classList.remove(player_1.getColor());
            }
        }
    }

    let grid_row = createGridRows();

    for ( let i = 0; i < grid_row.length; i++ ) {
        for ( let j = 0; j < grid_row[i].length; j++ ) {
            let p1 = grid_row[i][j].classList.contains(player_1.getColor());
            let p2 = grid_row[i][j].classList.contains(player_2.getColor());

            if ( !p1 && !p2 ) {
                // add player 1 class to this cell
                grid_row[i][j].classList.add(player_1.getColor());
                
                // check win after add p1 class
                if ( checkWin(grid_row) != null ) {
                    // remove player 1 class from cell after checking
                    console.log(j, checkWin(grid_row), 'lose', grid_row)
                    grid_row[i][j].classList.remove(player_1.getColor());
                    return j;
                }
                
                // remove player 1 class from cell after checking
                grid_row[i][j].classList.remove(player_1.getColor());
            }
        }
    }

    return null;
}

// Check Bot Win (Rule 1)
function checkBotWin() {
    let grid = createGridColumns();

    for ( let i = 0; i < grid.length; i++ ) {
        // if the column is full just skip it to next one
        if ( grid[i][0].classList.contains(player_1.getColor()) || grid[i][0].classList.contains(player_2.getColor()))
            continue;

        for ( let j = 0; j < grid[i].length; j++ ) {
            let p1 = grid[i][j].classList.contains(player_1.getColor());
            let p2 = grid[i][j].classList.contains(player_2.getColor());

            if ( !p1 && !p2 ) {
                // add player 2 class to this cell
                grid[i][j].classList.add(player_2.getColor());

                // check win after add p1 class
                if ( checkWin(grid) != null ) {
                    // remove player 2 class from cell after checking
                    console.log(i, checkWin(grid), 'win', grid)
                    grid[i][j].classList.remove(player_2.getColor());
                    return i;
                }

                // remove player 2 class from cell after checking
                grid[i][j].classList.remove(player_2.getColor());
            }
        }
    }

    let grid_row = createGridRows();

    for ( let i = 0; i < grid_row.length; i++ ) {
        for ( let j = 0; j < grid_row[i].length; j++ ) {
            let p1 = grid_row[i][j].classList.contains(player_1.getColor());
            let p2 = grid_row[i][j].classList.contains(player_2.getColor());

            if ( !p1 && !p2 ) {
                // add player 2 class to this cell
                grid_row[i][j].classList.add(player_2.getColor());

                // check win after add p1 class
                if ( checkWin(grid_row) != null ) {
                    // remove player 2 class from cell after checking
                    console.log(j, checkWin(grid_row), 'win', grid_row)
                    grid_row[i][j].classList.remove(player_2.getColor());
                    return j;
                }

                // remove player 2 class from cell after checking
                grid_row[i][j].classList.remove(player_2.getColor());
            }
        }
    }

    return null;
}

// Play Bot In (Index)
function playBotIn(ind) {
    console.log(ind);
    cellFlow(player_2, ind);
}