function GameController(){
	this.board='';
	this.boardView='';
	this.currentPlayer='';
	
	this.newGame = function(){
		this.board = new Board();
		this.board.createTiles();
		this.board.setBoardElements();
		this.boardView = new BoardView();
		this.boardView.buildView(this.board);
	};
};