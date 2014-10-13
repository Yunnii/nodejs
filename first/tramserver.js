var http = require('http');

var server = http.createServer();
var tram = false;
server.on('request', function(req, res) {
			res.writeHeader(200,{'Content-Type': 'text/plain'});
			res.write(tram.toString());
			res.end();
		});
var traminterval = setInterval(function() {
							tram = !tram;
							});
server.listen(3000,'127.0.0.1');