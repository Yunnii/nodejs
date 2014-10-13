var express = require('express');
var app = express();

var is_tram_comming = 0

setInterval(function () {
	is_tram_comming = (is_tram_comming += 1) % 2
    console.log("Changing tram state to: ", is_tram_comming);
}, 20000);

app.get('/', function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send('The state of tram is: ' + is_tram_comming);
});

app.get('/tram_api', function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ is_tram_comming: is_tram_comming, 
  	           "permissions": ["http://www.google.com/", "http://*/"], 
  	         })
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});