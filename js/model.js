//use module pattern


 

function Tile(x, y) {
	//prop1 & prop2 range from 0 to 3 and are the matching criteria between tiles
	this.prop1 = x;
	this.prop2 = y;
	this.line = "";
	this.col = "";
	this.elt="out";
};