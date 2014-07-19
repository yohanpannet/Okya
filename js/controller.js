
var gameController = (function (){
	var board='';
	var boardView='';
	var player1 = '';
	var player2 = '';
	var currentPlayer='';
	//console.log('1 st call');
	
	
	var createPlayers = function(){
		player1 = new Player("player1");
		player2 = new PlayerIA("player2");
	};
	
	var pick1stPlayer = function(){
		currentPlayer = (Math.random()>0.5)?player1:player2;
		console.log(currentPlayer.id);
		currentPlayer.turnStart();
	};
	
	switchPlayer = function(){
		//this.currentPlayer.turnStop();
		if (currentPlayer === player1){
			currentPlayer = player2;
		} else {
			currentPlayer = player1;
		}
		currentPlayer.turnStart();
	};
	
	endGame = function(){
		$('.pBoard').toggle();
	}
	
	return{
		getBoard : function(){
			return board;
		},
		newGame : function(){
			console.log('new game');
			//TO DO : New to clean previous board!!
			board = new Board();
			board.createTiles();
			createPlayers();
			board.setBoardElements();
			boardView = new BoardView();
			boardView.buildView(board);
			
			//initControls();
			
			pick1stPlayer();
		},
		chooseTile : function(row, col){
			//Replace tile by an 'active player' token
			//put it in the discard pile
			//Set next selectable tiles
			//Check victory
			//switch players
				
			var tile = board.getTile(row,col);
			// get the 2 attributes: 
			//Replace tile on model & put in discard
			board.tileTaken(tile,currentPlayer);
			
			//replace tile on view & put in discard
			$('#lastTile').attr('prop1',tile.prop1)
				.attr('prop2',tile.prop2);
			$('#tile'+tile.line+tile.col).removeClass().addClass(
					$('#'+currentPlayer.id).attr('class')).addClass('ui-block-b');
			
			//Check victory
			if (board.checkVictory(tile, currentPlayer)){
				console.log(currentPlayer+" Wins!");
				endGame();
				$("#winningText").text(currentPlayer.id+" Won!");
			}
			else{
				currentPlayer.turnEnd();
				//switch player
				switchPlayer();
			}
			
		}
	};
})();


var tileClicked = function(){
	$(this).unbind('tap',tileClicked);
	gameController.chooseTile($(this).attr('line'),	$(this).attr('col'));
};

function Player(id){
	this.id = id;
	this.turnStart = function(){
		console.log('turn start for '+this.id);
		//make the eligible tiles 'clickable'
		//tiles' id are 'tile' + row number + col number.
		gameController.getBoard().getTakableTiles().forEach(function(elt){
			$('#tile'+elt.line+elt.col).bind('tap',tileClicked);
		});
		
	}
	
	this.turnEnd = function(){
		$('.tile').unbind('tap',tileClicked);
	}
};


function PlayerIA(id){
	this.id = id;
	this.turnStart = function(){
		console.log('turn start for '+this.id);
		setTimeout(function(){
			//pick a random dropable tile
			var board = gameController.getBoard();
			var possibilities = board.getTakableTiles();
			var randIndex = Math.floor(Math.random() * possibilities.length);
			var chosenTile = possibilities[randIndex]
			gameController.chooseTile(chosenTile.line, chosenTile.col);
		}, 2000);
	}
	
	this.turnEnd = function(){
		
	}
};