
function GameController(){
	var board='';
	var boardView='';
	var player1 = '';
	var player2 = '';
	var currentPlayer='';
	//console.log('1 st call');
	
	
	var createPlayers = function(){
		//pick the players profile according to the selected radio on home page
		player1Type = $('input:radio[name=radio-P1]:checked').val();
		player2Type = $('input:radio[name=radio-P2]:checked').val();

		switch(player1Type){
		case 'human':
			player1 = new Player("player1");
			break;
		case 'IA':
			player1 = new PlayerIA("player1");
			break;
		}
		
		switch(player2Type){
		case 'human':
			player2 = new Player("player2");
			break;
		case 'IA':
			player2 = new PlayerIA("player2");
			break;
		}
	};
	
	var pick1stPlayer = function(){
		currentPlayer = (Math.random()>0.5)?player1:player2;
		switchPlayer();
		console.log(currentPlayer.id);
	};
	
	switchPlayer = function(){
		//this.currentPlayer.turnStop();
		if (currentPlayer === player1){
			currentPlayer = player2;
		} else {
			currentPlayer = player1;
		}
		$('#currentPlayer').removeClass()
		.addClass('infoTile').addClass('tile')
		.addClass('player')
		.addClass(currentPlayer.id)
		currentPlayer.turnStart();
	};
	
	
	
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
			$('#tile'+tile.line+tile.col).removeClass()
				.addClass('player')
				.addClass(currentPlayer.id)
				.addClass('ui-block-b');
			
			//Check victory
			if (board.checkVictory(tile, currentPlayer)){
				console.log(currentPlayer+" Wins!");
				
				$("#winningText").text(currentPlayer.id+" Won!");
			}
			else{
				currentPlayer.turnEnd();
				//switch player
				switchPlayer();
			}
			
		}
	};
};
var gameController = new GameController();

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