class GameBoard {
    constructor() {
        this.board = new Array();
        this.currentPlayer = X_PLAYER;
        this.init();
    }

    setTile = function(tileIndex) {
        this.board[tileIndex].setTilePlayer(this.currentPlayer);
    }

    init = function() {
        for (var index = 0; index < NUMBER_OF_TILES; ++index) {
            this.board[index] = new Tile();
            this.board[index].setTilePlayer("A" + index);
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
        if (this.checkIfTileIsFree(tileIndex)) {
            this.setTile(tileIndex);

            var currentButton = tileButtons[tileIndex];
            currentButton.innerHTML = "<b>" + this.currentPlayer + "</b>";
            currentButton.style.backgroundColor = "ORANGERED";

            if (this.checkIfDraw()) {
                this.declareWinner();
            }

            if (this.checkIfWin(tileIndex)) {
                this.declareWinner(O_PLAYER);
            } else {
                gameBoard.switchPlayer();
            }
        } else {
            this.AITurn()
        }
    }

    checkIfTileIsFree = function(tileIndex) {
        var tilePlayer = this.board[tileIndex].playerCode;
        return (tilePlayer != X_PLAYER && tilePlayer != O_PLAYER)
    }
    checkIfWin = function(tileIndex) {
        if (this.checkWinConditions()) {
            alert(this.currentPlayer + " has won the game!");
            return true;
        }
        return false;
    }

    checkIfDraw = function() {
        var numberOfFilledTiles = 0;
        for (var i = 0; i < NUMBER_OF_TILES; ++i) {
            var currentTileCode = this.board[i].playerCode;
            if (currentTileCode == X_PLAYER || currentTileCode == O_PLAYER) {
                ++numberOfFilledTiles;
            }
        }
        return (numberOfFilledTiles == NUMBER_OF_TILES);
    }

    checkWinConditions = function() {
        var board = this.board;
        var currentPlayer = this.currentPlayer;

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

    declareWinner = function(winningPlayer) {
        switch (winningPlayer) {
            case X_PLAYER:
                document.body.innerHTML = "<div><h1>You win!</h1></div>";
                break;
            case O_PLAYER:
                document.body.innerHTML = "<div><h1>You lose!</h1></div>";
                break;
            default:
                document.body.innerHTML = "<div><h1>Draw!</h1></div>"
        }
    }
}