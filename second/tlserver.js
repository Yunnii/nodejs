var trafficlight = require('../TrafficLight');
var events = require('events');
var emitter = new events.EventEmitter();
var http = require('http');

var tl = new trafficlight.TrafficLight(5000, 5000, 5000, true);
tl.tramsubscribe(emitter);
setInterval(function() {
				emitter.emit('tram');
				}, 33000);

var server = http.createServer();
server.on('request', function(req, res) {
				res.writeHeader(200, {'Content-Type': 'text/plain'});
				res.write(tl.state());
				res.end();
			});
server.listen(3000,'127.0.0.1');
