var http = require('http');

function requestHandler(request, response)
{
    response.writeHeader(200,{
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });

    response.write(tram.toString());
    response.end();
}

var server = http.createServer(requestHandler);
var tram   = false;

var tramInterval = setInterval(function()
{
    tram = !tram;
    var tramTimeout = setTimeout(function()
    {
        tram = !tram;
    }, 1000);
}, 20000);

server.listen(3000, 'localhost');
