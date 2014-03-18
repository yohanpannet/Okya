function BoardView (){
	
	function buildView(modelBoard){
		
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
					'fauna': tile.prop1,
					'flora': tile.prop2,
					'line':i,
					'col':j
				});
				//div.append('<header>' + tile.prop1 + ' </header><header>' + tile.prop2 + '</header>');
				col.append(div);

				line.append(col);
			}
			//board.appendChild(line);
			boardDOM.append(line);
		}
	}
}