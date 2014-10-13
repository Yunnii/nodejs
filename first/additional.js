function changeDOM() {
	document.getElementById('colorParagraph').innerHTML = tl.state();
}

function checkTramAndEmit() {
	ajax('http://127.0.0.1:3000/', function(res) {
				if (res == 'true') {
					emitter.emit('tram');
				}
		});
}

tl = new TrafficLight(5000, 5000, 5000, true);
emitter = new EventEmitter();
tl.tramsubscribe(emitter);
setInterval(checkTramAndEmit, 500);

