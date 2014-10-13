function changeDOM() {
	document.getElementById('colorParagraph').innerHTML = tl.state();
}



tl = new TrafficLight(5000, 5000, 5000, true);

