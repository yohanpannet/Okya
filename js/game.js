/**
 * @author Yohan
 */



function buildBoard() {
	//create tile index list for random pick up
	tileIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	
	var board = document.getElementById("board");
	board.innerHTML = '';
	for (var i = 0; i < 4; i++) {
		var line = document.createElement('tr');
		for (var j = 0; j < 4; j++) {
			var col = document.createElement('td');
			//get random tile
			randIndex = Math.floor(Math.random() * tileIndexes.length);
			var randIndex = tileIndexes.splice(randIndex,1)[0];
			var tile = tiles[randIndex];

			var div = document.createElement('div');
			div.setAttribute('class', 'tile');
			div.setAttribute('droppable', true);
			div.classList.add('droppable');
			div.setAttribute('taken', false);
			div.setAttribute('fauna', tile.x);
			div.setAttribute('flora', tile.y);
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

function checkVictory(tileElt, playerID, nbPossibilities){
	var Victory = false;
	if (nbPossibilities == 0){
		Victory = true;
	};
	
	return Victory;
}

var tiles = [];
currentPlayer = '';
player1 = new Player("player1");
player2 = new Player("player2");


createTiles();

buildBoard();

pickFirstPlayer();

//tiles[0].elt.style.color = "white";
