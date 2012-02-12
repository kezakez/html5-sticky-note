$(function () {
	function addNote(id, text, position) {
		var notetext = $('<textarea>'+text+'</textarea>');
		var newnote = $('<div class="note"></div>');
		notetext.appendTo(newnote);
		newnote.appendTo($("#notes"));
		newnote.css({
			'position': 'absolute',
			'top': position.top,
			'left': position.left
		});
		newnote.bind('drag', function (ev, dd) {
			$(this).css({
				'top': dd.offsetY,
				'left': dd.offsetX
			});
			saveNote(id, notetext.val(), notetext.offset());
		});
		notetext.keyup(function () {
			saveNote(id, notetext.val(), notetext.offset());
		});
	}

	function loadNotes() {
		//localStorage.clear();
		// load all notes
		var notes = localStorage.length;
		if (notes) {
			for (var i = 0; i < notes; i++) {
				var note = localStorage.getItem(i);
				if (note) {
					note = JSON.parse(note);
					addNote(note.id, note.text, note.position);
				}
			}
		}
		
		return notes;
	}

	function saveNote(id, text, position) {
		// save a note
		var note = {};
		note.id = id;
		note.text = text;
		note.position = position;
		localStorage.setItem(id, JSON.stringify(note));
	}
	
	var id = loadNotes();
	
	$("#addnote").click(function () {
		var text = "New Sticky Note";
		var pos = 50 + id * 100;
		var position = {top: pos, left: pos};
		addNote(id, text, position);
		saveNote(id, text, position);
		id += 1;
	});
});