/**
 * @author Yohan
 */

function handleDragStart(e) {
  // Target (this) element is the source node.
  
//  this.style.opacity = '0.4';

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('PlayerColor', this.style.backgroundColor);
  e.dataTransfer.setData('PlayerId', this.get1ttribute('id'));
}


function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
		// Necessary. Allows us to drop.
	}

	e.dataTransfer.dropEffect = 'move';
	// See the section on the DataTransfer object.

	return false;
}


function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {

}

function handleDrop(e) {
	// this/e.target is current target element.

	if (e.stopPropagation) {
		e.stopPropagation();
		// Stops some browsers from redirecting.
	}
	var droppable = this.getAttribute('droppable');

	if (droppable == "true") {
		var p = e.dataTransfer.getData('PlayerColor');
		this.style.backgroundColor = e.dataTransfer.getData('PlayerColor');
		cimetary.innerHTML = this.innerHTML;
		this.setAttribute('droppable',false);
		this.setAttribute('taken',e.dataTransfer.getData('PlayerId'));
		//set next selectable tiles
		var fauna = this.getAttribute('fauna');
		var flora = this.getAttribute('flora');
		tiles.forEach(function(tile) {
			
			if (((tile.x == eval(fauna)) || (tile.y == eval(flora))) && tile.elt.getAttribute('taken') == "false"){
				tile.elt.classList.add('droppable');
				tile.elt.setAttribute('droppable',true);
			} else {
				tile.elt.classList.remove('droppable');
				tile.elt.setAttribute('droppable',false);
			}
		});
	}

}


function handleDragEnd(e) {
  tiles.forEach(function(tile) {
  tile.elt.classList.remove('droppable');
});
}



var cimetary = document.getElementById("lastTile");

var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");

p1.addEventListener('dragstart', handleDragStart, false);
p2.addEventListener('dragstart', handleDragStart, false);

tiles.forEach(function(tile) {
  tile.elt.addEventListener('dragover', handleDragOver, false);
//  tile.elt.addEventListener('dragenter', handleDragEnter, false);
  tile.elt.addEventListener('drop', handleDrop, false);
});
