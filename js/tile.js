/**
 * @author Yohan
 */

flora = ["erable","cerisier","",""];
fauna = ["sun","rain","autonm",""];

var Tile = function(x, y) {
	//x,y: [0..3]
	var that = this;
	that.x = x;
	that.y = y;
	that.line = "";
	that.col = "";
	that.elt="out";
	return that;
};


var Player = function(id){
	var that = this;
	that.id = id;
	that.name = id;
	that.elt = document.getElementById(id);
	that.turnStart = function(){
		that.elt.setAttribute('draggable',true);
		that.elt.classList.add('actif');
		document.getElementById('playerTurn').innerHTML = that.name + "'s turn";
	};
	that.turnStop = function(){
		that.elt.setAttribute('draggable',false);
		that.elt.classList.remove('actif');

	};
	return that;
}

var PlayerIA = function(id){
	var that = new Player(id);
	that.name = 'monkey';
	that.turnStart = function(){
		//that.elt.setAttribute('draggable',true);
		that.elt.classList.add('actif');
		document.getElementById('playerTurn').innerHTML = that.name  + " is thinking (ahah)";
		
		setTimeout(function(){
			//pick a random dropable tile
			var dropable = "false";
			var tile;
			while (dropable == "false"){
				var randIndex = Math.floor(Math.random() * tiles.length);
				tile = tiles[randIndex];
				dropable = tile.elt.getAttribute('droppable');
			}
			tileTaken(tile.elt, that.id);
		}, 5000);
		
	};
	return that;
}

