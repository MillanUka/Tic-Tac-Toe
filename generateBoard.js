let tileButtons = new Array();

let buttonNumber = 1;

//Creating the buttons
for (var i = 0; i < NUMBER_OF_TILES / 3; ++i) {
    document.writeln("<p>");
    for (var j = 0; j < NUMBER_OF_TILES / 3; ++j) {
        document.writeln("<button id = " + buttonNumber + "><b>-</b></button>");
        tileButtons.push(document.getElementById(buttonNumber));
        ++buttonNumber;
    }
    document.writeln("</p>");
}

//Adding the event listener on to the buttons
for (var i = 0; i < NUMBER_OF_TILES; ++i) {
    tileButtons[i].addEventListener('click', function() {
        var currentButton = event.srcElement;
        //Subtrating 1 in order to get an idnex
        var tileIndex = currentButton.id - 1;
        var tilePlayerCode = gameBoard.board[tileIndex].playerCode;

        //Checking whether or not if the clicked on button doesn't already exist to a player
        if (tilePlayerCode != X_PLAYER && tilePlayerCode != O_PLAYER) {
            gameBoard.setTile(tileIndex);
            //Changing the button to show the X player
            currentButton.innerHTML = "<b>" + X_PLAYER + "</b>";

            currentButton.style.backgroundColor = "RED";

            //Checking whetehr the player wins or not
            if (gameBoard.checkIfDraw()) {
                gameBoard.declareWinner();
            }

            if (gameBoard.checkIfWin(tileIndex)) {
                gameBoard.declareWinner(X_PLAYER);
            } else {
                gameBoard.switchPlayer();
            }

        } else {
            //Alert the user the tile they click on already belongs to a player
            alert("This Tile already has a player!")
        }
    });
}