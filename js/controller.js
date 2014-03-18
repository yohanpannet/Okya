function GameController(){
	this.board='';
	this.boardView='';
	this.tiles = [];
	this.discardPile = [];
	this.player1='';
	this.player2='';
	this.currentPlayer='';
	
	function newGame(){
		this.board = new Board();
		this.board.createTiles();
		this.board.setBoardElements();
		this.boardView = new BoardView();
		this.boardView.buildView(this.board);
	};
};