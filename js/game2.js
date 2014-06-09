var party='';

function startNewGame(){
	console.log('startGame');
	$.mobile.changePage('#pagegame');
	gameController.newGame();
}

//init the pop...
$("#popupEndGame").popup()


