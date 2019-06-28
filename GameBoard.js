//A Class which represents the game board in which Tic-Tac-Toe is played on
class GameBoard {
    constructor() {
        this.board = {};
        this.currentPlayer = X_PLAYER;
        this.init();
    }

    //Set a tile as the current player
    setTile = function(tileIndex) {
        if (tileIndex >= 0 || tileIndex < NUMBER_OF_TILES)
            this.board[tileIndex].setTilePlayer(this.currentPlayer);
    }

    init = function() {
        for (var index = 0; index < NUMBER_OF_TILES; ++index) {
            this.board[index] = new Tile();
            this.board[index].setTilePlayer("A" + index);
        }
    }

    //Switch the player to the next player
    switchPlayer() {
        if (this.currentPlayer == X_PLAYER) {
            this.currentPlayer = O_PLAYER;
            //Simulate the AI turn
            this.AITurn();
        } else {
            this.currentPlayer = X_PLAYER;
        }
    }

    //This method simulates the AI turn
    AITurn = function() {
        //This index is the index for the AI to win it will be -1 if they cannot win in that turn
        var winIndex = this.checkPossiblePlayerTurns(O_PLAYER);
        //This index is the index for the player to win it will be -1 if they cannot win in that turn
        var loseIndex = this.checkPossiblePlayerTurns(X_PLAYER);
        //checking whether the index that may cause the player is valid
        if (winIndex != -1) {
            this.setAITile(winIndex);
        } else if (loseIndex != -1) {
            this.setAITile(loseIndex);
        } else {
            //If the AI can't find a move that will cause the player to win just do a random move
            this.AIRandomMove();
        }

        //Check whether the AI cause a draw or win
        if (this.checkIfDraw()) {
            this.declareWinner();
        }
        if (this.checkIfWin()) {
            this.declareWinner(O_PLAYER);
        }

        gameBoard.switchPlayer();
    }


    //This method check the possible moves that the player could do in there next turn
    checkPossiblePlayerTurns = function(playerCode) {
        var board = this.board;
        //Mkaing a temporary gameboard to simulate the player next move
        var tempBoard = new GameBoard();

        //Saving the current game state in to the new board
        for (i = 0; i < NUMBER_OF_TILES; ++i) {
            tempBoard.board[i].playerCode = board[i].playerCode;
        }

        //This is the index which the player will pick in order to win the game
        var tempIndex = -1;

        for (i = 0; i < NUMBER_OF_TILES; ++i) {
            if (this.checkIfTileIsVacant(i)) {
                tempBoard.board[i].playerCode = playerCode;

                if (tempBoard.checkIfWin()) {
                    tempIndex = i;
                }
                tempBoard.board[i].playerCode = board[i].playerCode;
            }
        }
        return tempIndex;
    }

    AIRandomMove = function() {
        var tileIndex = Math.floor(Math.random() * NUMBER_OF_TILES);
        //CHecking whether the random tile is free/vacant
        if (this.checkIfTileIsVacant(tileIndex)) {
            this.setAITile(tileIndex);
        } else {
            this.AIRandomMove()
        }
    }

    setAITile = function(index) {
        this.setTile(index);
        var currentButton = tileButtons[index];
        currentButton.innerHTML = "<b>" + this.currentPlayer + "</b>";
        currentButton.style.backgroundColor = "ORANGERED";

    }

    checkIfTileIsVacant = function(tileIndex) {
        var tilePlayer = this.board[tileIndex].playerCode;
        return (tilePlayer != X_PLAYER && tilePlayer != O_PLAYER)
    }

    checkIfWin = function() {
        if (this.checkWinConditions())
            return true;
        return false;
    }

    checkIfDraw = function() {
        var numberOfFilledTiles = 0;
        //Checking every tile to see if it is not vacant and add it to a variable to see
        for (var i = 0; i < NUMBER_OF_TILES; ++i) {
            var currentTileCode = this.board[i].playerCode;
            if (!(this.checkIfTileIsVacant(i))) {
                ++numberOfFilledTiles;
            }
        }
        //If the number of tiles that are not vacant is 9 then return true
        return (numberOfFilledTiles == NUMBER_OF_TILES);
    }

    checkWinConditions = function() {
        var board = this.board;
        var currentPlayer = this.currentPlayer;
        var playerHasWon = false;

        //These are the check for the win conditions
        //TODO: There is probably a better way to this rather than  hard coding the values
        //Which I might add on later
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
        //Declare the winner and change the HTML page without going to a specific page
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