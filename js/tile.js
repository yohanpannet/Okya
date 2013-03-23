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
	that.elt="out";
	return that;
};


//tile = new Tile(2,3);
