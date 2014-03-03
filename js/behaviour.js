/**
 * @author Yohan
 */

function handleDragStart(e) {
  // Target (this) element is the source node.
  
//  this.style.opacity = '0.4';

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('PlayerColor', this.style.backgroundColor);
  e.dataTransfer.setData('PlayerId', this.getAttribute('id'));
}


function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
		// Necessary. Allows us to drop.
	}

	//e.dataTransfer.dropEffect = 'move';
	e.originalEvent.dataTransfer.dropEffect = 'move';
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
		
		tileTaken($(this), e.originalEvent.dataTransfer.getData('PlayerId'));	
	}

}

function tileTaken(tileElt, playerID){
	var player = $('#'+playerID);
	
	tileElt.css('backgroundColor', player.css('backgroundColor'));
	cimetary.innerHTML = tileElt.innerHTML;
	tileElt.attr({'droppable':false,
			'taken':player.attr('id')
	});
	//set next selectable tiles
	var fauna = tileElt.attr('fauna');
	var flora = tileElt.attr('flora');
	//select next playble tiles
	var nbPossibilities = 0;
	//console.log(currentPlayer.name +' has taken : ' + fauna + ' : '+flora);
	//console.log('Droppable tile are : ');
	tiles.forEach(function(tile) {
		
		if (((tile.x == eval(fauna)) || (tile.y == eval(flora))) && tile.elt.attr('taken') == "false"){
			tile.elt.addClass('droppable');
			tile.elt.attr('droppable',true);
			nbPossibilities++;
			//console.log(tile.x +' : '+tile.y);
	
		} else {
			tile.elt.removeClass('droppable');
			tile.elt.attr('droppable',false);
		}
	});
		
	if (checkVictory(tileElt, playerID, nbPossibilities) == true){
		alert(playerID + ' Wins !');
	} else {
		switchPlayer();
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


