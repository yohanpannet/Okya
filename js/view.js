function BoardView(){
	
	this.buildView = function (modelBoard){
		
		var boardDOM = $("#boardDOM");
		for (var i = 0; i < 4; i++) {
			var line = $('<tr>');
			for (var j = 0; j < 4; j++) {
				var tile = modelBoard[i][j];
				var col = $('<td>');
				var div = $('<div>',{
					'class': 'tile droppable '+
						'prop1'+tile.prop1+' prop2'+tile.prop2,
					'id':'tile'+i+j,
					'droppable': true,
					'taken': false,
					'line':i,
					'col':j
				});
				col.append(div);

				line.append(col);
			}
			boardDOM.append(line);
		}
	}
}