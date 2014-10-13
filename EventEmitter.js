/**
 * Constructs EventEmitter
 *
 * @constructor
 * @this {EventEmitter}
 */

function EventEmitter() {
    /** @private */ this.__listeners = {};

/**
 * Adds event listener
 *
 *
 * @this {EventEmitter}
 * @param {string} event 
 * @param {func} listener
 */	
    EventEmitter.prototype.on = function (event, listener) {
        if (this.__listeners[event] === undefined) {
            this.__listeners[event] = [];
        }
        this.__listeners[event].push(listener);
    };
	
/**
 * Removes event listener
 *
 *
 * @this {EventEmitter}
 * @param {string} event 
 * @param {func} listener
 */	
    EventEmitter.prototype.off = function (event, listener) {
        if (this.__listeners[event] !== undefined) {
            for (var i = 0; i < this.__listeners[event].length; i++) {
                if (this.__listeners[event][i] === listener)
                    this.__listeners[event].splice(i,1);
            }
        }
    };
	
/**
 * Returns function to call in setTimeout
 *
 * @private
 * @this {EventEmitter}
 * @param {string} event 
 * @param {int} position
 * @param {string} data Optional data
 */		
	EventEmitter.prototype.__returnFunction = function (event, position, data) {
		return function () {
			this.__listeners[event][position](data);
		}.bind(this);
	};

/**
 * Emits event
 *
 *
 * @this {EventEmitter}
 * @param {string} event 
 * @param {string} data Optional data
 */		
    EventEmitter.prototype.emit = function (event, data) {
        if (this.__listeners[event] !== undefined) {
            for (var i = 0; i < this.__listeners[event].length; i++) {
                setTimeout(this.__returnFunction(event, i, data), 0);
            }
        }
    };
    
}

var isNodeJS = function() {
	if (typeof module !== 'undefined' && module.exports) {
		return true;
	} else {
		return false;
	}
}

if (isNodeJS()) {
	exports.EventEmitter = EventEmitter;
}