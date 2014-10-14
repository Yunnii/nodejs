var trafficlight = require('./Traffic_lights');
var events = require('events');
var express = require('express');

var app = express();
var emitter = new events.EventEmitter();

var param = '{"green":4000,"yellow":1000,"red":6000}';
var my_trafficlight = new trafficlight(param);
my_trafficlight.toGreen(); // Start TrafficLights
my_trafficlight.onEventEmmiter(emitter);

setInterval(function() {
				emitter.emit("Tram is comming");
				}, 20000);

app.get('/', function(req, res){
	res.send('The state of tram is: ' + my_trafficlight.getState());
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});