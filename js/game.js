/**
 * @author Yohan
 */



function buildBoard() {
	//create tile index list for random pick up
	tileIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	
	var board = $("#board");
	board.empty();
	for (var i = 0; i < 4; i++) {
		tilesTable[i]=[];
		var line = $('<tr>');
		for (var j = 0; j < 4; j++) {
			var col = $('<td>');
			//get random tile
			randIndex = Math.floor(Math.random() * tileIndexes.length);
			var randIndex = tileIndexes.splice(randIndex,1)[0];
			var tile = tiles[randIndex];
			tilesTable[i][j]=tile;
			tile.line = i;
			tile.col = j;
			var div = $('<div>',{
				'class': 'tile droppable',
				'droppable': true,
				'taken': false,
				'fauna': tile.x,
				'flora': tile.y,
				'line':i,
				'col':j
			});
			div.append('<header>' + tile.x + ' </header><header>' + tile.y + '</header>');
			tile.elt = div;
			col.append(div);

			line.append(col);
		}
		//board.appendChild(line);
		board.append(line);
	}
	
	tiles.forEach(function(tile) {
		//tile.elt.addEventListener('dragover', handleDragOver, false);
		//tile.elt.addEventListener('drop', handleDrop, false);
		tile.elt.on('dragover', handleDragOver);
		tile.elt.on('drop', handleDrop);
	});

	player1 = new Player("player1");
	player2 = new PlayerIA("player2");
	cimetary.innerHTML = '<div id="lastTile" class="tile"></div>';
	
	player1.elt.setAttribute('draggable',false);
	player1.elt.classList.remove('actif');
	player2.elt.setAttribute('draggable',false);
	player2.elt.classList.remove('actif');
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
	currentPlayer.turnStop();
	if (currentPlayer === player1){
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}
	currentPlayer.turnStart();
}

function pickFirstPlayer(){
	if (Math.random()<0.5){
			currentPlayer = player1;
		} else {
			currentPlayer = player2;
		}
	//currentPlayer.elt.setAttribute('draggable',true);
	//currentPlayer.elt.classList.add('actif');
	//document.getElementById('playerTurn').innerHTML = currentPlayer.id + ' opens the game';
	currentPlayer.turnStart();
}


function checkVictory(tileElt, playerID, nbPossibilities) {
	var victory = false;
	if (nbPossibilities == 0) {
		victory = true;
	};
	var line = eval(tileElt.attr('line'));
	var col = eval(tileElt.attr('col'));
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
	var color = tileElts[0].elt.attr('taken');
	for (var i = 1; i<4;i++){
		if (color != tileElts[i].elt.attr('taken')){
			match = false;
		}
	}
	return match;
}

function startGame(){
	createTiles();
	buildBoard();
	pickFirstPlayer();
}

var tiles = [];
var tilesTable = [];
currentPlayer = '';

startGame();

