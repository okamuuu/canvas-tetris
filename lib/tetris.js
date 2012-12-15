var baseShapes = [
    [ 1, 1, 1, 1],
    [ 1, 1, 1, 0,
      1],
    [ 1, 1, 1, 0,
      0, 0, 1],
    [ 1, 1, 0, 0, 
      1, 1],
    [ 1, 1, 0, 0, 
      0, 1, 1],
    [ 0, 1, 1, 0,
      1, 1],
    [ 0, 1, 0, 0, 
      1, 1, 1]
];

function _copy(data) {
    return JSON.parse( JSON.stringify(data) );
}

function Tetris() {}

var tetris = new Tetris(); // for frontend javascript

try { module.exports = tetris } catch(e) {}; // for node.js

Tetris.prototype.createBoard = function(rowCount, colCount) {

    var board = [];

    for (var y = 0; y < rowCount; ++y) {
        board[y] = [];
        for (var x = 0; x < colCount; ++x) {
            board[y][x] = 0;
        }
    }

    return board;
};

Tetris.prototype.getInitialPositions = function(colCount) {

    return {
        x: Math.ceil(colCount / 2) - 1,
        y: 0
    };
};

Tetris.prototype.createShape = function(id) {

    var baseShape = baseShapes[id];

    var shape = [];
    for (var y = 0; y < 4; ++y) {
        shape[y] = [];
        for (var x = 0; x < 4; ++x) {
            var i = 4 * y + x;
            if (typeof baseShape[i] !== 'undefined' && baseShape[i]) {
                shape[y][x] = id + 1;
            } else {
                shape[y][x] = 0;
            }
        }
    }

    return shape;
};

Tetris.prototype.createCursol = function(positions, shape) {

    return {
        positions: positions,
        shape: shape
    };
};

Tetris.prototype.rotateCursol = function(cursol) {

    var current = cursol.shape;
    var newShape = [];

    for (var y = 0; y < 4; ++y) {
        // x と y が入れ替わる
        newShape[y] = [];
        for (var x = 0; x < 4; ++x) {
            newShape[y][x] = current[3 - x][y];
        }
    }

    cursol.shape = newShape;

    return cursol;
};


Tetris.prototype.rotateCursolShape = function(cursol) {

    var current = cursol.shape;
    var newShape = [];

    for (var y = 0; y < 4; ++y) {
        // x と y が入れ替わる
        newShape[y] = [];
        for (var x = 0; x < 4; ++x) {
            newShape[y][x] = current[3 - x][y];
        }
    }

    cursol.shape = newShape;
};

Tetris.prototype.isRotatable = function(board, cursol) {

    var current = cursol.shape;
    var newShape = [];

    for (var y = 0; y < 4; ++y) {
        // x と y が入れ替わる
        newShape[y] = [];
        for (var x = 0; x < 4; ++x) {
            newShape[y][x] = current[3 - x][y];
        }
    }

    var temporaryCursol = this.createCursol(cursol.positions, newShape);

    console.log(temporaryCursol.shape);

    return this.isValidCursol(temporaryCursol, board) ? true : false;
}

Tetris.prototype.isMovable = function(board, cursol, direction) {

    if(direction === 'rotate') {
        console.log('checkRotate');
        return this.isRotatable(board, cursol);
    }

    var offsets = {
        left : [ 0, -1 ], // y, x
        right: [ 0,  1 ], 
        down : [ 1,  0 ]
    }[direction];

    if(!offsets) {
        throw new Error('direction:' + direction + ' is invalid!!');
    }

    var nextPositions = {};

    nextPositions.y = cursol.positions.y + offsets[0];
    nextPositions.x = cursol.positions.x + offsets[1];

    var temporaryCursol = this.createCursol(nextPositions, cursol.shape);

    return this.isValidCursol(temporaryCursol, board) ? true : false;
};

Tetris.prototype.moveCursol = function(cursol, direction) {

    if(direction==='rotate') {
        console.log('moveRotate');
        return this.rotateCursol(cursol);
    }
   
    var offsets = {
        left : [ 0, -1 ], // y, x
        right: [ 0,  1 ], 
        down : [ 1,  0 ]
    }[direction];

    if(!offsets) {
        throw new Error('direction:' + direction + ' is invalid!!');
    }

    cursol.positions.y += offsets[0];
    cursol.positions.x += offsets[1];
};

Tetris.prototype.isValidCursol = function(cursol, board) {

    var shape = cursol.shape;
    var positions = cursol.positions;
 
    // 0 .. 3
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            // board の範囲外に shape が存在しない
            if(shape[y][x]) {
                if(board[y+positions.y] === undefined || board[y+positions.y][x+positions.x] === undefined) {
                    return false;
                }
                else if(shape[y][x] && board[y+positions.y][x+positions.x]>0) {
                    return false;
                }
            }
        }
    }

    return true;
};

Tetris.prototype.freeze = function(board, cursol) {

    var positions = cursol.positions;
    var currentShape = cursol.shape;

    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (currentShape[y][x]) {
                board[y + positions.y][x + positions.x] = currentShape[y][x];
            }
        }
    }

};

Tetris.prototype.render = function(board, cursol) {

    var view = _copy(board);

    var shape = cursol.shape;
    var positions = cursol.positions;

    // 0 .. 3
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if(shape[y][x]) {
                view[y+positions.y][x+positions.x] = shape[y][x];
            }
        }
    }

    return view;
};


