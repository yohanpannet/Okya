function BoardView(){
	
	this.buildView = function (modelBoard){
		
		var boardDOM = $("#boardDOM");
		boardDOM.empty();
		$("#lastTile").removeAttr('prop1').removeAttr('prop2');
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				var tile = modelBoard[i][j];
				var div = $('<div>',{
					'class': 'tile ui-block-b',
						//+'prop1'+tile.prop1+' prop2'+tile.prop2,
					'id':'tile'+i+j,
					'taken': false,
					'prop1':tile.prop1,
					'prop2':tile.prop2,
					'line':i,
					'col':j
				});
				boardDOM.append(div);

			}
		}
	}
}