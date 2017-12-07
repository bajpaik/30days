
$(function() {
	alert("For some reason you feel like typing \"muffins\".. Give it a go ☺️");
	const pressed = [];
	const key = 'muffins';

	window.addEventListener('keyup', (e) => {
		console.log(e.key);
		pressed.push(e.key);
		pressed.splice(-key.length - 1, pressed.length - key.length);
		console.log(pressed);
		if(pressed.join('').includes(key)) 
			cornify_add();
	});
});
