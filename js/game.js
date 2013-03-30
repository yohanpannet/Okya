/**
 * @author Yohan
 */



function buildBoard() {
	//create tile index list for random pick up
	tileIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	
	var board = document.getElementById("board");
	board.innerHTML = '';
	for (var i = 0; i < 4; i++) {
		tilesTable[i]=[];
		var line = document.createElement('tr');
		for (var j = 0; j < 4; j++) {
			var col = document.createElement('td');
			//get random tile
			randIndex = Math.floor(Math.random() * tileIndexes.length);
			var randIndex = tileIndexes.splice(randIndex,1)[0];
			var tile = tiles[randIndex];
			tilesTable[i][j]=tile;
			tile.line = i;
			tile.col = j;
			var div = document.createElement('div');
			div.setAttribute('class', 'tile');
			div.setAttribute('droppable', true);
			div.classList.add('droppable');
			div.setAttribute('taken', false);
			div.setAttribute('fauna', tile.x);
			div.setAttribute('flora', tile.y);
			div.setAttribute('line', i);
			div.setAttribute('col', j);
			div.innerHTML = '<header>' + tile.x + ' </header><header>' + tile.y + '</header>';
			tile.elt = div;
			col.appendChild(div);
			line.appendChild(col);
		}
		board.appendChild(line);
	}

}


function createTiles(){
	for (var i = 0; i < 4; i++) { 
		for(var j = 0; j < 4; j++) {
			tiles[i+4*j]=new Tile(i,j);
			//tiles[i]=1
		}
	}
}



function switchPlayer(){
	currentPlayer.elt.setAttribute('draggable',false);
	currentPlayer.elt.classList.remove('actif');
	
	if (currentPlayer === player1){
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}
	currentPlayer.elt.setAttribute('draggable',true);
	currentPlayer.elt.classList.add('actif');
	document.getElementById('playerTurn').innerHTML = currentPlayer.id + "'s turn";
}

function pickFirstPlayer(){
	if (Math.random()<0.5){
			currentPlayer = player1;
		} else {
			currentPlayer = player2;
		}
	currentPlayer.elt.setAttribute('draggable',true);
	currentPlayer.elt.classList.add('actif');
	document.getElementById('playerTurn').innerHTML = currentPlayer.id + ' opens the game';
	
}


function checkVictory(tileElt, playerID, nbPossibilities) {
	var victory = false;
	if (nbPossibilities == 0) {
		victory = true;
	};
	var line = eval(tileElt.getAttribute('line'));
	var col = eval(tileElt.getAttribute('col'));
	var tileElts = [];
	//check line
	for ( j = 0; j < 4; j++) {
		tileElts.push(tilesTable[line][j]);
	}
	if (fourTilesMatch(tileElts)) {
		victory = true;
	}
	tileElts = [];
	//check col
	for ( i = 0; i < 4; i++) {
		tileElts.push(tilesTable[i][col]);
	}
	if (fourTilesMatch(tileElts)) {
			victory = true;
	}
	//check topleft diagonale if eligible
	if (line == col) {
		tileElts = [];
		for ( i = 0; i < 4; i++) {
			tileElts.push(tilesTable[i][i]);
		}
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}
	//check bottom left diagonale if eligible
	if ((line + col) == 3) {
		tileElts = [];
		for ( i = 0; i < 4; i++) {
			tileElts.push(tilesTable[i][3 - i]);
		}
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}
	//square checking: a tile can be in 4 (at most) different square...
	//check upper left squre
	if ((line < 3)&&(col < 3)){
		tileElts = [];
		tileElts.push(tilesTable[line][col]);
		tileElts.push(tilesTable[line+1][col]);
		tileElts.push(tilesTable[line][col+1]);
		tileElts.push(tilesTable[line+1][col+1]);
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}
	//check upper right squre
	if ((line < 3)&&(col > 0)){
		tileElts = [];
		tileElts.push(tilesTable[line][col]);
		tileElts.push(tilesTable[line+1][col]);
		tileElts.push(tilesTable[line][col-1]);
		tileElts.push(tilesTable[line+1][col-1]);
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}
	//check bottom left squre
	if ((line >0)&&(col <3 )){
		tileElts = [];
		tileElts.push(tilesTable[line][col]);
		tileElts.push(tilesTable[line-1][col]);
		tileElts.push(tilesTable[line][col+1]);
		tileElts.push(tilesTable[line-1][col+1]);
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}
	//check bottom right square
	if ((line >0)&&(col >0 )){
		tileElts = [];
		tileElts.push(tilesTable[line][col]);
		tileElts.push(tilesTable[line-1][col]);
		tileElts.push(tilesTable[line][col-1]);
		tileElts.push(tilesTable[line-1][col-1]);
		if (fourTilesMatch(tileElts)) {
				victory = true;
		}
	}	
	
	return victory;
}

function fourTilesMatch(tileElts){
	//take a 4 tileElt list and check if the 'color' match
	var match = true;
	var color = tileElts[0].elt.getAttribute('taken');
	for (var i = 1; i<4;i++){
		if (color != tileElts[i].elt.getAttribute('taken')){
			match = false;
		}
	}
	return match;
}

var tiles = [];
var tilesTable = [];
currentPlayer = '';
player1 = new Player("player1");
player2 = new Player("player2");


createTiles();

buildBoard();

pickFirstPlayer();

//tiles[0].elt.style.color = "white";
