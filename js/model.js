//use module pattern


 

function Tile(x, y) {
	//prop1 & prop2 range from 0 to 3 and are the matching criteria between tiles
	this.prop1 = x;
	this.prop2 = y;
	this.line = "";
	this.col = "";
	this.elt="out";
	this.owner=undefined;
};

function Board(){
	this.discardPile = [];
	this.tiles = [];
	
	this.createTiles = function(){
		for (var i = 0; i < 4; i++) { 
			for(var j = 0; j < 4; j++) {
				this.tiles[i+4*j]=new Tile(i,j);
				//tiles[i]=1
			}
		}
	};
	
	this.setBoardElements = function(){
		//put the tile on the board
		
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
		
	};
	
	this.getTile = function(x,y){
		return this[x][y];
	}
	
	this.tileTaken = function(tile, player){
		this.discardPile.unshift(tile);
		tile.owner = player;
		
	};
	
	this.checkVictory = function(tile, player){
		//count 'takable' tiles
		var nbTakable = 0;
		this.tiles.forEach(function(elt){
			if ((elt.owner===undefined)&&(elt.prop1 == tile.prop1 || elt.prop2 == tile.prop2)){
				nbTakable++;
			}
		});
		if (nbTakable == 0) {return true;}
		
		//check group of 4 tiles: there is 8 possible groups for a tile (max)
		//some of the following combinaisons might get 'out of bound' but it is manage...
		var col = tile.col;
		var line = tile.line;
		var isGroup =
		this.fourTilesMatch([this[line][0],this[line][1],this[line][2],this[line][3]])|| //line
		this.fourTilesMatch([this[0][col],this[1][col],this[2][col],this[3][col]])|| //column
		// 4 squares
		(!(line<3&&col<3)?false:
			this.fourTilesMatch(
					[this[line][col], this[line][col+1], this[line+1][col], this[line+1][col+1]]))|| 
		(!(line<3&&col>0)?false:
			this.fourTilesMatch(
					[this[line][col-1], this[line][col], this[line+1][col-1], this[line+1][col]]))||
		(!(line>0&&col<3)?false:
			this.fourTilesMatch(
					[this[line-1][col], this[line-1][col+1], this[line][col], this[line][col+1]]))||
		(!(line>0&&col>0)?false:
			this.fourTilesMatch(
					[this[line-1][col-1], this[line-1][col], this[line][col-1], this[line][col]]))||
		//2 diagonals
		(!(line==col)?false:
			this.fourTilesMatch(
					[this[0][0], this[1][1], this[2][2], this[3][3]]))||			
		(!((line+col)==3)?false:
			this.fourTilesMatch(
					[this[0][3], this[1][2], this[2][1], this[3][0]]));
		//console.log('isGroup = '+isGroup);
		return isGroup;
	};
	
	//take a 4 tile list (might contains undefined) and check if the owner match
	this.fourTilesMatch = function(tileElts){
		//if 1st tile exists, owner = its owner, else owner = undefined 
		var owner = tileElts[0]!=undefined?tileElts[0].owner:undefined;
		var match = true;
		tileElts.forEach(function(elt){
			if ((elt === undefined)||(elt.owner!=owner)) {match = false};
			});
		return match;
	}
	
};

Board.prototype = Array.prototype;


