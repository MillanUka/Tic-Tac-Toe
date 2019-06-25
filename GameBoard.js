class GameBoard {
    constructor() {
        this.board = new Array();
        console.log("test")
        this.currentPlayer = X_PLAYER;
        this.init();
    }

    setTile = function(tileIndex) {
        console.log(tileIndex);
        this.board[tileIndex].setTilePlayer(this.currentPlayer);
    }

    init = function() {
        for (var index = 0; index < NUMBER_OF_TILES; ++index) {
            this.board[index] = new Tile();
            this.board[index].setTilePlayer("A" + index);
            console.log(this.board[index].playerCode);
        }
    }

    switchPlayer() {
        if (this.currentPlayer == X_PLAYER) {
            this.currentPlayer = O_PLAYER;
            this.AITurn();
        } else {
            this.currentPlayer = X_PLAYER;
        }
    }

    AITurn = function() {
        var tileIndex = Math.floor(Math.random() * NUMBER_OF_TILES);

        console.log("tileIndex: " + tileIndex)
        if (this.checkIfTileIsFree(tileIndex)) {
            gameBoard.setTile(tileIndex);

            var currentButton = tileButtons[tileIndex];
            currentButton.innerHTML = "<b>" + gameBoard.currentPlayer + "</b>";
            currentButton.style.backgroundColor = "ORANGERED";

            gameBoard.checkIfWin(tileIndex);
            gameBoard.switchPlayer();
        } else {
            this.AITurn()
        }
    }

    checkIfTileIsFree = function(tileIndex) {
        console.table(this.board);
        var tilePlayer = this.board[tileIndex].playerCode;
        return (tilePlayer != X_PLAYER && tilePlayer != O_PLAYER)
    }
    checkIfWin = function(tileIndex) {
        if (this.checkWinConditions()) {
            alert(this.currentPlayer + " has won the game!");
        }
    }

    checkWinConditions = function() {
        var board = this.board;
        var currentPlayer = this.currentPlayer;
        console.table(board)

        var playerHasWon = false;
        if (board[0].playerCode == board[1].playerCode && board[0].playerCode == board[2].playerCode) {
            playerHasWon = true;
        } else if (board[3].playerCode == board[4].playerCode && board[3].playerCode == board[5].playerCode) {
            playerHasWon = true;
        } else if (board[6].playerCode == board[7].playerCode && board[6].playerCode == board[8].playerCode) {
            playerHasWon = true;
        } else if (board[0].playerCode == board[3].playerCode && board[0].playerCode == board[6].playerCode) {
            playerHasWon = true;
        } else if (board[1].playerCode == board[4].playerCode && board[1].playerCode == board[7].playerCode) {
            playerHasWon = true;
        } else if (board[2].playerCode == board[5].playerCode && board[2].playerCode == board[8].playerCode) {
            playerHasWon = true;
        } else if (board[0].playerCode == board[4].playerCode && board[0].playerCode == board[8].playerCode) {
            playerHasWon = true;
        } else if (board[2].playerCode == board[4].playerCode && board[2].playerCode == board[6].playerCode) {
            playerHasWon = true;
        }

        return playerHasWon;
    }
}