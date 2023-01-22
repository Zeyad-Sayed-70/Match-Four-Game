import { cells } from './index.js';

export function createGridRows() {
    // create game grid_rows
    let grid_rows = [];
    let timp_grid_rows = [];
    let ins = 0;

    for ( let i = 0; i < cells.length; i++ ) {
        timp_grid_rows.push(cells[i])
        ins++;

        if ( ins === 7 ) {
            ins = 0;
            grid_rows.push(timp_grid_rows);
            timp_grid_rows = [];
        }
    }
    // console.log(grid_rows);
    return grid_rows;
}

export function createGridColumns() {
    // create game grid_columns
    let grid_columns = [];
    let timp_grid_columns = [];
    let startInd = 0;
    let _mp = 0;

    while (startInd < 7) {
        timp_grid_columns.push(cells[startInd+(_mp*7)])

        if ( _mp === 5 ) {
            grid_columns.push(timp_grid_columns);
            timp_grid_columns = [];
            startInd++;
            _mp = 0;
            continue;
        }
        
        _mp++;
    }
    // console.log(grid_columns);
    return grid_columns;
}

export function createDianlogGrid() {
    let startInd = 3;
    let _nor = 4; // Num Of Repeat
    let _mp = 0;
    let isOtherSide = false;
    let grid_dianlog = [];
    let timp_grid_dianlog = [];

    while (startInd <= 20) {
        timp_grid_dianlog.push(cells[startInd+(_mp*6)])

        _mp++;
        
        if ( _mp >= _nor ) {
            grid_dianlog.push(timp_grid_dianlog);
            timp_grid_dianlog = [];
            
            startInd >= 6 ? startInd += 7 : startInd++;
            _mp = 0;

            // inc or dec _nor Depends on a side
            if ( !isOtherSide )
                _nor === 6 ? _nor++ : '';

            _nor >= 6 ? isOtherSide = true : '';
            isOtherSide ? _nor-- : _nor++;
        }
    }
    // console.log(grid_dianlog)
    return grid_dianlog;
}

export function createReverseDianlogGrid() {
    let startInd = 3;
    let _nor = 4; // Num Of Repeat
    let _mp = 0;
    let isOtherSide = false;
    let grid_dianlog = [];
    let timp_grid_dianlog = [];

    while (startInd <= 14) {
        timp_grid_dianlog.push(cells[startInd+(_mp*8)])

        _mp++;
        
        if ( _mp >= _nor ) {
            grid_dianlog.push(timp_grid_dianlog);
            timp_grid_dianlog = [];

            startInd <= 0 || startInd > 6 ? startInd += 7 : startInd--;
            _mp = 0;

            // inc or dec _nor Depends on a side
            if ( !isOtherSide )
                _nor === 6 ? _nor++ : '';

            _nor >= 6 ? isOtherSide = true : '';
            isOtherSide ? _nor-- : _nor++;
        }
    }
    // console.log(grid_dianlog)
    return grid_dianlog;
}
