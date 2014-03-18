//use module pattern


 

function Tile(x, y) {
	//prop1 & prop2 range from 0 to 3 and are the matching criteria between tiles
	this.prop1 = x;
	this.prop2 = y;
	this.line = "";
	this.col = "";
	this.elt="out";
	this.owner='';
};

function Board(){
	this.discardPile = [];
	this.tiles = [];
	this.player1 = '';
	this.player2 = '';
	
	this.createTiles = function(){
		for (var i = 0; i < 4; i++) { 
			for(var j = 0; j < 4; j++) {
				this.tiles[i+4*j]=new Tile(i,j);
				//tiles[i]=1
			}
		}
	};
	
	this.setBoardElements = function(){
		//create tile index list for random pick up
		var tileIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		for (var i = 0; i < 4; i++) {
			this.push([]);
			for (var j = 0; j < 4; j++) {
				randIndex = Math.floor(Math.random() * tileIndexes.length);
				var randIndex = tileIndexes.splice(randIndex,1)[0];
				var tile = this.tiles[randIndex];
				this[i][j]=tile;
				tile.line = i;
				tile.col = j;
			}
		}
		player1 = new Player("player1");
		player2 = new PlayerIA("player2");
	};
	
	function tileTaken(tile, player){
		
		this.discardPile.unshift(tile);
		tile.owner = player;
		
	}
	
};

Board.prototype = Array.prototype;

function Player(id){
	this.id = id;
};


function PlayerIA(){
	
};

PlayerIA.prototype = Player.prototype;