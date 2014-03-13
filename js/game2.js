var party='';

function startNewGame(){
	party = new Party().startGame();
	
}

var Party = function(){
	this.board=[];
	this.tiles = [];
	this.discardPile = [];
	this.player1='';
	this.player2='';
	this.currentPlayer='';
	
	this.startGame = function(){
		
		this.createTiles();
		this.setBoard();
		this.buildView();
		//pickFirstPlayer();
	};
	
	
	this.createTiles = function(){
		for (var i = 0; i < 4; i++) { 
			for(var j = 0; j < 4; j++) {
				this.tiles[i+4*j]=new Tile(i,j);
				//tiles[i]=1
			}
		}
	};
	
	this.setBoard = function(){
		//create tile index list for random pick up
		var tileIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		for (var i = 0; i < 4; i++) {
			this.board[i]=[];
			for (var j = 0; j < 4; j++) {
				randIndex = Math.floor(Math.random() * tileIndexes.length);
				var randIndex = tileIndexes.splice(randIndex,1)[0];
				var tile = this.tiles[randIndex];
				this.board[i][j]=tile;
				tile.line = i;
				tile.col = j;
			}
		}
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

