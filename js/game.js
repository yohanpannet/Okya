/**
 * @author Yohan
 */

function buildBoard() {
	//create tile index list for random pick up
	tileIndexes=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	
	var elt = document.getElementById("board");
	elt.innerHTML= '';
	for (var i=0; i<16;i++){
		//get random tile
		randIndex = Math.floor(Math.random() * tileIndexes.length);
		var randIndex = tileIndexes.splice(randIndex,1)[0];
		var tile = tiles[randIndex];
		
		var div = document.createElement('div');
		div.setAttribute('class', 'tile');
		div.setAttribute('droppable', true);
		div.setAttribute('taken', false); 
		div.setAttribute('fauna', tile.x);
		div.setAttribute('flora', tile.y);
		div.innerHTML='<header>'+tile.x+' '+tile.y+'</header>';
		tile.elt=div;
		elt.appendChild(div);
		
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

function randomPop(list){
	var lst = [];
	var index = Math.floor(Math.random() * lst.length);
	lst2 = lst.slice(index);
	popedElt = lst.pop();
		
}


var tiles = [];
createTiles();

buildBoard();



tiles[0].elt.style.color = "white";
