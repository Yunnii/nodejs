var currentColor = null;

var xmlHttp = new HttpRequest();
xmlHttp.create();

setInterval(function()
{
    xmlHttp.getRequest('http://localhost:3000/', function(response) {
        currentColor = response;
    });

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

