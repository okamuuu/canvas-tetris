document.body.onkeydown = function(e) {

    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'space'
    };
    
    if( keys[e.keyCode] ) {
        keyPress( keys[ e.keyCode ]);
        render();
    }
};

