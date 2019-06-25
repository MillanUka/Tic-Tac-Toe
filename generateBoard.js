let tileButtons = new Array();

let buttonNumber = 1;

for (var i = 0; i < NUMBER_OF_TILES / 3; ++i) {
    document.writeln("<p>");
    for (var j = 0; j < NUMBER_OF_TILES / 3; ++j) {
        document.writeln("<button id = " + buttonNumber + "><b>-</b></button>");
        tileButtons.push(document.getElementById(buttonNumber));
        ++buttonNumber;
    }
    document.writeln("</p>");
}

for (var i = 0; i < NUMBER_OF_TILES; ++i) {
    tileButtons[i].addEventListener('click', function() {
        var currentButton = event.srcElement;
        var tileIndex = currentButton.id - 1;
        var tilePlayer = gameBoard.board[tileIndex].playerCode;

        if (tilePlayer != X_PLAYER && tilePlayer != O_PLAYER) {
            gameBoard.setTile(tileIndex);
            currentButton.innerHTML = "<b>" + gameBoard.currentPlayer + "</b>";

            currentButton.style.backgroundColor = "RED";

            if (gameBoard.checkIfDraw()) {
                gameBoard.declareWinner();
            }

            if (gameBoard.checkIfWin(tileIndex)) {
                gameBoard.declareWinner(X_PLAYER);
            } else {
                gameBoard.switchPlayer();
            }

        } else {
            alert("This Tile already has a player!")
        }
    });
}