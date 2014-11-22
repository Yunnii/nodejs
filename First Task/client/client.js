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

var lights = new Lights(config);

var tramEvent = new EventEmitter();
lights.startListenTram(tramEvent);

var xmlHttp = new HttpRequest();
xmlHttp.create();

setInterval(function()
{
    xmlHttp.getRequest('http://localhost:3000/', function(response) {
        if (response == 'true') {
            tramEvent.emit('tram');
            console.log('TRAM!');
        }
    });

    var currentColor = lights.state();

    switch(currentColor)
    {
        case 'green':
            document.getElementById('green').src = 'Lights/green.jpg';
            document.getElementById('yellow').src = 'Lights/none.jpg';
            document.getElementById('red').src = 'Lights/none.jpg';
            break;
        case 'yellow':
            document.getElementById('green').src = 'Lights/none.jpg';
            document.getElementById('yellow').src = 'Lights/yellow.jpg';
            document.getElementById('red').src = 'Lights/none.jpg';
            break;
        case 'red':
            document.getElementById('green').src = 'Lights/none.jpg';
            document.getElementById('yellow').src = 'Lights/none.jpg';
            document.getElementById('red').src = 'Lights/red.jpg';
            break;
    }

}, 1000);

