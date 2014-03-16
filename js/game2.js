var party='';

function startNewGame(){
	party = new Party().startGame();
	
}

var Party = function(){
	this.board='';
	this.tiles = [];
	this.discardPile = [];
	this.player1='';
	this.player2='';
	this.currentPlayer='';
	
	this.startGame = function(){
		this.board = new Board();
		this.board.createTiles();
		this.board.setBoard();
		this.buildView();
		//pickFirstPlayer();
	};
	
	
	
	this.buildView = function(){
		var boardDOM = $("#boardDOM");
		for (var i = 0; i < 4; i++) {
			var line = $('<tr>');
			for (var j = 0; j < 4; j++) {
				var tile = this.board[i][j];
				var col = $('<td>');
				var div = $('<div>',{
					'class': 'tile droppable '+
						'prop1'+tile.prop1+' prop2'+tile.prop2,
					'id':'tile'+i+j,
					'droppable': true,
					'taken': false,
					'fauna': tile.prop1,
					'flora': tile.prop2,
					'line':i,
					'col':j
				});
				//div.append('<header>' + tile.prop1 + ' </header><header>' + tile.prop2 + '</header>');
				col.append(div);

				line.append(col);
			}
			//board.appendChild(line);
			boardDOM.append(line);
		}
	}	
	
};
