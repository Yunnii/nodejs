var http = require('http');
var light = require('../Lights');
var event = require('../EventEmitter');

var config =
{
    timeout :
    {
        green 	: 6000,
        yellow 	: 2000,
        red		: 6000
    },
    order :
        [
            'green', 'yellow', 'red'
        ],
    tram :
    {
        wait  : 3000,
        time  : 10000,
        smart : 0.3
    }
};

function requestHandler(request, response)
{
    response.writeHeader(200,{
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });

    response.write(lights.state());
    response.end();
}

var lights = new light.Lights(config);

var tramEvent = new event.EventEmitter();
lights.startListenTram(tramEvent);

var server = http.createServer(requestHandler);
var tram   = false;

var tramInterval = setInterval(function()
{
    tramEvent.emit('tram');
}, 20000);

server.listen(3000, 'localhost');
