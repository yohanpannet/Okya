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
	
	return that;
}

var PlayerIA = function(id){
	var that = new Player(id);
	
	return that;
}

