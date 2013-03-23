/**
 * @author Yohan
 */
var Tile = function(x, y) {
	//x,y: [0..3]
	//function takes position and platform type
	var that = this;
	that.x = x;
	that.y = y;
	that.elt="out";
	return that;
};


//tile = new Tile(2,3);
