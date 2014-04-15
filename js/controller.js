



function GameController(){
	this.board='';
	this.boardView='';
	this.currentPlayer='';
	that = this;
	this.newGame = function(){
		this.board = new Board();
		this.board.createTiles();
		this.board.setBoardElements();
		this.boardView = new BoardView();
		this.boardView.buildView(this.board);
		
		this.setControls();
		
		this.pick1stPlayer();
	};
	
	this.setControls = function(){
		$('.tile')
			.not('#tile11,#tile12,#tile21,#tile22,#lastTile')
			.bind('tap',tilePicked);
		
	};
	
	this.pick1stPlayer = function(){
		this.currentPlayer = (Math.random()>0.5)?this.board.player1:this.board.player2;
		console.log(this.currentPlayer.id);
	};
	
	var tilePicked = function(){
		//Replace tile by an 'active player' token
		//put it in the discard pile
		//Set next selectable tiles
		//Check victory
		//switch players
		
		// get the 2 attributes: 
		console.log('clicked! '+$(this).attr('col')+ '  '+$(this).attr('line'));
		
		//Replace tile on model & put in discard
		that.tileTaken(that.board.getTile(
				$(this).attr('col'),
				$(this).attr('line')
					),that.currentPlayer);
		//replace tile on view & put in discard
		$('#lastTile').attr('class',
				$(this).attr('class'));
		$(this).removeClass().addClass(
				$('#'+that.currentPlayer.id).attr('class'));
		
		//Set next selectable tiles
		$('.tile').unbind('tap');
		
		//Check victory
		
		
		//switch player
		that.switchPlayer();
	};
	
	this.switchPlayer = function(){
		//this.currentPlayer.turnStop();
		if (this.currentPlayer === this.board.player1){
			this.currentPlayer = this.board.player2;
		} else {
			this.currentPlayer = this.board.player1;
		}
		//this.currentPlayer.turnStart();
	}
	
	this.tileTaken = function(tile, player){
		this.board.discardPile.unshift(tile);
		tile.owner = player;
		
	};
};