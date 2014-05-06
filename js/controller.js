
var gameController = (function(){
	var board='';
	var boardView='';
	var player1 = '';
	var player2 = '';
	var currentPlayer='';
	//console.log('1 st call');
	
	var initControls = function(){
		$('.tile')
		.not('#tile11,#tile12,#tile21,#tile22,#lastTile')
		.bind('tap',tilePicked);
	
	};
	
	var createPlayers = function(){
		player1 = new Player("player1");
		player2 = new PlayerIA("player2");
	};
	
	var pick1stPlayer = function(){
		currentPlayer = (Math.random()>0.5)?player1:player2;
		console.log(currentPlayer.id);
	};
	
	var tilePicked = function(){
		//Replace tile by an 'active player' token
		//put it in the discard pile
		//Set next selectable tiles
		//Check victory
		//switch players
		
		var tile = board.getTile(
				$(this).attr('line'),
				$(this).attr('col')
					);
		// get the 2 attributes: 
		console.log('clicked! '+$(this).attr('col')+ '  '+$(this).attr('line'));
		
		//Replace tile on model & put in discard
		board.tileTaken(tile,currentPlayer);
		//replace tile on view & put in discard
		$('#lastTile').attr('prop1',$(this).attr('prop1'))
			.attr('prop2',$(this).attr('prop2'));
		$('.tile').unbind('tap');
		$(this).removeClass().addClass(
				$('#'+currentPlayer.id).attr('class'));
		
		//Check victory
		if (board.checkVictory(tile, currentPlayer)){
			console.log(currentPlayer+" Won!");
		};
		
		//Set next selectable tiles
		$('.tile').filter('[prop1='+$(this).attr('prop1')+']').bind('tap',tilePicked);
		$('.tile').filter('[prop2='+$(this).attr('prop2')+']').bind('tap',tilePicked);
		
		
		//switch player
		switchPlayer();
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
	
	return{
		newGame : function(){
			console.log('new game');
			//TO DO : New to clean previous board!!
			board = new Board();
			board.createTiles();
			createPlayers();
			board.setBoardElements();
			boardView = new BoardView();
			boardView.buildView(board);
			
			initControls();
			
			pick1stPlayer();
		}
	};
})();




function Player(id){
	this.id = id;
	this.turnStart = function(){
		console.log('turn start for '+this.id);
	}
	
};


function PlayerIA(id){
	this.id = id;
	this.turnStart = function(){
		console.log('turn start for '+this.id);
	}
};