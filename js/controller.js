



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
	};
	
	this.setControls = function(){
		$('.tile')
			.not('#tile11,#tile12,#tile21,#tile22,#lastTile')
			.bind('tap',tilePicked);
		
	};
	
	var tilePicked = function(){
		//Replace tile by an 'active player' token
		//put it in the discard pile
		//Set next selectable tiles
		//Check victory
		
		console.log('clicked! '+$(this).attr('col')+ '  '+$(this).attr('line'))
		
		that.tileTaken(that.board.getTile($(this).attr('col'), $(this).attr('line')),that.currentPlayer);
		
		$(this).removeClass().addClass('player');
	};
	
	this.tileTaken = function(tile, player){
		this.board.discardPile.unshift(tile);
		tile.owner = player;
		
	};
};