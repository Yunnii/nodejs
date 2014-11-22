function Lights (config) 
{
	this._state		= null;
	this._config 	= config;
	this._timeout 	= null;
	this._timeoutID = null;
	this._lastUse   = null;

	this._prevState = null;
	this._prevTime  = null;
								
	Lights.prototype.state = function() 
	{
		return this._state;
	};
	
	Lights.prototype.nextColor = function() 
	{
		var index  = this._config.order.indexOf(this._state);
		var amount = this._config.order.length;

        var nextColor = this._config.order[ ( ++index % amount ) ];
        var timeout   = this._config.timeout[ nextColor ];
		
        this.switchColor(nextColor, timeout);
    };
	
    Lights.prototype.switchColor = function(color, timeout)
	{
		this._state = color;
		this._timeout = timeout;
		this._lastUse = new Date();
		
		if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout(function() 
		{
            this.nextColor();
        }.bind(this), this._timeout);
    };
	
	Lights.prototype.toGreen = function() 
	{
        this.switchColor("green", 
						 this._config.timeout.green);
    };
	
	Lights.prototype.toYellow = function() 
	{
        this.switchColor("yellow", 
						 this._config.timeout.yellow);
    };
	
	Lights.prototype.toRed = function() 
	{
        this.switchColor("red", 
						 this._config.timeout.red);
    };
	
    Lights.prototype.tramWaiting = function () 
    {
    	if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout(function () 
    	{
    		this.tramHere();
    	}.bind(this), this._config.tram.wait);
	};

	Lights.prototype.tramHere = function () 
	{
    	this._prevState = this._state;
    	this._prevTime  = 
    		this._config.timeout[this._prevState] - (new Date() - this._lastUse);
    	this._state     = "green";

    	if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout (function () 
    	{
    		this.backToLastState();
    	}.bind(this), this._config.tram.time);
	};

	Lights.prototype.backToLastState = function () 
	{

    	if (this._prevTime < this._config.tram.smart * this._config.timeout[this._prevState]) 
    	{
    		this._prevTime = 0;
   	 	}
   	 	if (this._prevState == "green")
   	 		if (this._prevTime > this._config.tram.time)
              	  this._prevTime -= this._config.tram.time;


       	this.switchColor(this._prevState, 
						 this._config.timeout[this._prevState]);
	};

	Lights.prototype.startListenTram = function(tramEvent) 
	{
   		 tramEvent.add("tram", function () 
   		 {
   		 	this.tramWaiting()
   		 }.bind(this));
	};

	this.toGreen();
}

var isNodeJS = function() {
    if (typeof module !== 'undefined' && module.exports) {
        return true;
    } else {
        return false;
    }
};

if (isNodeJS()) {
    exports.Lights = Lights;
}