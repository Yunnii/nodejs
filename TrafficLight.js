/**
 * Constructs new TrafficLight object
 *
 *
 * @this {TrafficLight}
 * @constructor
 * @param {int} redTime
 * @param {int} yellowTime
 * @param {int} greenTime
 * @param {boolean} debug
 */
 
function TrafficLight(redTime, yellowTime, greenTime, debug) { 
	/** @private */ this.__debug = debug;
    /** @private */ this.__trammode = null;
    /** @private */ this.__tramtimer = null;
    /** @private */ this.__timer = null;
    /** @private */ this.__tramstate = null;
    /** @private */ this.__state = null;
    /** @private */ this.__stateChangedTime = null;
    /** @private */ this.__redTime = redTime;
    /** @private */ this.__yellowTime = yellowTime;
    /** @private */ this.__greenTime = greenTime;
    /** @private */ this.__tramWaitTime = 3000;
    /** @private */ this.__tramGreenTime = 10000;
    /** @private */ this.__usefulCoefficient = 0.7;
	
	
/**
 * Prints message to console if DEBUG is TRUE
 *
 * @private
 *
 */
 
	TrafficLight.prototype.__debuglog = function (message) {
		if (this.__debug) 
			console.log(message);
	}


/**
 * Sets new timer for color changes and checks if the is only one timer
 *
 * @private
 * @this {TrafficLight}
 * @param {int} delay 
 * @param {func} func
 * @param {string} data Optional data
 */	
    TrafficLight.prototype.__setnewtimer = function (delay, func) {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
        this.__stateChangedTime = new Date();
        this.__timer = setTimeout(func, delay);
    };

/**
 * Returns amount of time this color should be active
 *
 * @private
 * @this {TrafficLight}
 */		
    TrafficLight.prototype.__currentStateTime = function () {
        return this['__' + this.__state + 'Time'];
    };

/**
 * Changes color to red
 *
 * @this {TrafficLight}
 */	
    TrafficLight.prototype.toRed = function () {
        this.__debuglog('Changed to red');
        this.__state = 'red';
        this.__setnewtimer(this.__redTime, function () {
            this.toGreen();
        }.bind(this));
    };
	
/**
 * Changes color to green
 *
 * @this {TrafficLight}
 */	
    TrafficLight.prototype.toGreen = function () {
        this.__debuglog('Changed to green');
        this.__state = 'green';
        this.__setnewtimer(this.__greenTime, function () {
            this.toYellow();
        }.bind(this));
    };

/**
 * Changes color to yellow
 *
 * @this {TrafficLight}
 */	
    TrafficLight.prototype.toYellow = function () {
        this.__debuglog('Changed to yellow');
        this.__state = 'yellow';
        this.__setnewtimer(this.__yellowTime, function () {
            this.toRed();
        }.bind(this));
    };

/**
 * Exits tram mode
 *
 * @private
 * @this {TrafficLight}
 */	
    TrafficLight.prototype.__exittrammode = function () {
        this.__debuglog('Exit tram mode');
        this.__tramstate = null;
        this.__trammode = null;
        if (new Date() - this.__stateChangedTime > this.__usefulCoefficient * this.__currentStateTime()) {
            switch (this.__state) {
                case 'red': this.toGreen(); break;
                case 'yellow': this.toRed(); break;
                case 'green': this.toYellow(); break;
            }
        }
    };

/**
 * Enters tram mode
 *
 * @private
 * @this {TrafficLight}
 */
    TrafficLight.prototype.__entertrammode = function () {
        this.__debuglog('Entering tram mode');
        this.__trammode = 'using';
        this.__tramstate = 'green';
        this.__tramtimer = setTimeout(function () {
                        this.__exittrammode();
                    }.bind(this), this.__tramGreenTime);
    };
   
/**
 * Tram mode enter callback for Tram event
 *
 * @private
 * @this {TrafficLight}
 */   
    TrafficLight.prototype.__tramcallback = function (data) {
        if (!this.__trammode) {
            this.__debuglog('Handling tram event');
            this.__trammode = 'waiting';
            this.__tramtimer = setTimeout(function () {
                        this.__entertrammode();
                    }.bind(this), this.__tramWaitTime);
        }
    };
    
/**
 * Subscribes to Tram event of specified TrafficLight
 *
 * 
 * @this {TrafficLight}
 * @param {object} event
 */
    TrafficLight.prototype.tramsubscribe = function (event) {
        event.addListener('tram', function() {
                            this.__tramcallback();
                        }.bind(this));
    };	

	
/**
 * Returns current state
 *
 * 
 * @this {TrafficLight}
 */
    TrafficLight.prototype.state = function () {
        if (this.__trammode == 'using')
            return this.__tramstate;
        return this.__state;
    };

    this.toGreen();
}

exports.TrafficLight = TrafficLight;