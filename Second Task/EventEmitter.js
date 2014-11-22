function EventEmitter() 
{
	this._listeners = {};

	EventEmitter.prototype.add = function(name, func)
	{
		if (this._listeners[name] == null)
			this._listeners[name] = [];

		this._listeners[name].push(func);
	}

	EventEmitter.prototype.del = function(name, func)
	{
		for(var key in _listeners)
		{
			for (var i=0; i < this._listeners[key].length; ++i)
				if (this._listeners[key][i] === func) 
					this._listeners[key].splice(i, 1);
		}
	}

	EventEmitter.prototype.emit = function(key) 
	{
		for (var i=0; i < this._listeners[key].length; ++i)
			setTimeout(this._listeners[key][i], 0);	
	}
}

var isNodeJS = function() {
    if (typeof module !== 'undefined' && module.exports) {
        return true;
    } else {
        return false;
    }
};

if (isNodeJS()) {
    exports.EventEmitter = EventEmitter;
}