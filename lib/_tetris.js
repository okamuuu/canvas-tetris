var COLS = 10,
    ROWS = 20;
var board = [];
var current, currentX, currentY;

var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];

var colors = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];

function newShape() {

    var id = Math.floor( Math.random() * shapes.length );
    var shape = shapes[id];

    current = [];
    for (var y = 0; y < 4; ++y) {
        current[y] = [];
        for (var x = 0; x < 4; ++x) {
            var i = 4 * y + x;
            if (typeof shape[i] !== 'undefined' && shape[i]) {
                current[y][x] = id + 1;
            } else {
                current[y][x] = 0;
            }
        }
    }
    currentX = 5;
    currentY = 0;
}

function init() {
    for (var y = 0; y < ROWS; ++y) {
        board[y] = [];
        for (var x = 0; x < COLS; ++x) {
            board[y][x] = 0;
        }
    }
}

function clearLines() {
    for (var y = ROWS - 1; y >= 0; --y) {
        var row = true;
    
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] == 0) {
                row = false;
                break;
            }
        }
        
        // もし横一列すべてブロックが存在しているなら
        if (row) {
            // y より上の部分は全部消してしまう
            for (var yy = y; yy > 0; --yy) {
                for (var x = 0; x < COLS; ++x) {
                    board[yy][x] = board[yy - 1][x];
                }
            }++y;
        }
    }
}

// どっち回転?


function rotate(current) {
    var newCurrent = [];
    for (var y = 0; y < 4; ++y) {
        // x と y が入れ替わる
        newCurrent[y] = [];
        for (var x = 0; x < 4; ++x) {
            newCurrent[y][x] = current[3 - x][y];
        }
    }

    return newCurrent;
}

function clearLines() {
    for (var y = ROWS - 1; y >= 0; --y) {
        var row = true;
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] == 0) {
                row = false;
                break;
            }
        }
        if (row) {
            for (var yy = y; yy > 0; --yy) {
                for (var x = 0; x < COLS; ++x) {
                    board[yy][x] = board[yy - 1][x];
                }
            }++y;
        }
    }
}

function keyPress(key) {

    switch (key) {
    case 'left':
        if (valid(-1)) {
            --currentX;
        }
        break;
    case 'right':
        if (valid(1)) {
            ++currentX;
        }
        break;
    case 'down':
        if (valid(0, 1)) {
            ++currentY;
        }
        else {
            tick();
        }
        break;
    case 'rotate':
        var rotated = rotate(current);
        if (valid(0, 0, rotated)) {
            current = rotated;
        }
        break;
//    case 'space':
//        freeze();
//        clearLines();
//        newShape();
//        break;
    }
}

function valid(offsetX, offsetY, newCurrent) {

    // offset は隙間となるブロックが残されているかどうか
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for (var y = 0; y < 4; ++y) {

        for (var x = 0; x < 4; ++x) {

            if (newCurrent[y][x]) {

                // 指定された箇所は下過ぎる...
                // 指定された箇所は左過ぎるか右過ぎる...
                // そこ、もうなんかあるだけど...
                // あとはわかんない
                if (typeof board[y + offsetY] == 'undefined' || typeof board[y + offsetY][x + offsetX] == 'undefined' || board[y + offsetY][x + offsetX] || x + offsetX < 0 || y + offsetY >= ROWS || x + offsetX >= COLS) {
                    return false;
                }
            }
        }
    }
    return true;
}

function freeze() {

    for (var y = 0; y < 4; ++y) {

        for (var x = 0; x < 4; ++x) {

            if (current[y][x]) {
                board[y + currentY][x + currentX] = current[y][x];
            }

        }
    }
}

function tick() {
        if ( valid( 0, 1 ) ) {
            ++currentY;
        }
        else {
    freeze();
    clearLines();
    newShape();
        }
}

init();
newShape();
setInterval( tick, 250 );
