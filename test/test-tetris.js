var should = require('should');
var tetris = require('../lib/tetris');

describe('Tetris create board object', function() {

    it('should create board object', function() {

        var board = tetris.createBoard(20, 10);

        var expected = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        should.deepEqual(board, expected);
    });

    it('should get initial postions', function() {

        var positions = tetris.getInitialPositions(10);

        positions.x.should.equal(4);
        positions.y.should.equal(0);
    });

    it('should create shape id:0.', function() {

        var shape0 = tetris.createShape(0);

        var expected = [ 
            [ 1, 1, 1, 1 ], 
            [ 0, 0, 0, 0 ], 
            [ 0, 0, 0, 0 ], 
            [ 0, 0, 0, 0 ]
         ];
        
        should.deepEqual(shape0, expected);
    });

    it('should create shape id:1.', function() {

        var shape1 = tetris.createShape(1);

        var expected = [ 
            [ 2, 2, 2, 0 ], 
            [ 2, 0, 0, 0 ], 
            [ 0, 0, 0, 0 ], 
            [ 0, 0, 0, 0 ]
         ];
        
        should.deepEqual(shape1, expected);
    });

    it('should creat cursol', function() {

        var positions = tetris.getInitialPositions(10);
        var shape1 = tetris.createShape(1);
        
        var cursol = tetris.createCursol(positions, shape1);

        should.exist( cursol.shape );
        should.exist( cursol.positions );
    });

    it('should rotate.', function() {
       
        var board = tetris.createBoard(20, 10);

        var positions = tetris.getInitialPositions(10);
        var shape1 = tetris.createShape(1);
        var cursol = tetris.createCursol(positions, shape1);

        tetris.rotateCursolShape(cursol);
        
        var expected = [ 
            [ 0, 0, 2, 2 ], 
            [ 0, 0, 0, 2 ], 
            [ 0, 0, 0, 2 ], 
            [ 0, 0, 0, 0 ]
         ];
 
        should.deepEqual(cursol.shape, expected);
    });

    it('should move cursol', function() {

        var positions = tetris.getInitialPositions(10);
        var shape1 = tetris.createShape(1);
        
        var cursol = tetris.createCursol(positions, shape1);

        should.equal( positions.y, 0 );
        should.equal( positions.x, 4 );
        
        tetris.moveCursol(cursol, 'left');

        should.equal( positions.y, 0 );
        should.equal( positions.x, 3 );
        
        tetris.moveCursol(cursol, 'down');

        should.equal( positions.y, 1 );
        should.equal( positions.x, 3 );
         
        tetris.moveCursol(cursol, 'right');

        should.equal( positions.y, 1 );
        should.equal( positions.x, 4 );
    });

    it('should calc cursol shape.', function() {

        var board = tetris.createBoard(20, 10);
        var shape1 = tetris.createShape(1);
        var cursol = tetris.createCursol({x:5, y:0}, shape1);
        
        should.ok( tetris.isValidCursol(cursol, board) );
        
        var cursol = tetris.createCursol({x:-1, y:0}, shape1);
        should.ok( ! tetris.isValidCursol(cursol, board) );
    });

    it('should render.', function() {
       
        var board = tetris.createBoard(20, 10);

        var positions = tetris.getInitialPositions(10);
        var shape1 = tetris.createShape(1);
        var cursol = tetris.createCursol(positions, shape1);

        var view = tetris.render(board, cursol);

        var expected = [
            [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        should.deepEqual(view, expected);
    });

    it('should freeze.', function() {
 
        var board = tetris.createBoard(20, 10);

        var shape1 = tetris.createShape(1);
        var cursol = tetris.createCursol({y:18, x:4}, shape1);

        tetris.freeze(board, cursol);

        var expected = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0]
        ];

        should.deepEqual(board, expected);
    });

});
