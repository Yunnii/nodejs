function Traffic_lights(config_file)
{
    this.state = null
    this.switchTime = null;

    this.tram_mode = false;
    this.wait_for_tram = 3000;
    this.green_for_tram = 15000;
    this.percent_of_curr_color = 0.9;

    this._timeout = null
    this._config = config_file || null;
    if (this._config)
        this._config = JSON.parse(this._config)

    Traffic_lights.prototype.toYellow = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
        this.switchTime = new Date();
        this.state = 'yellow'
        this._timeout = setTimeout(function () {
            this.toRed();
        }.bind(this), this._config[this.state])
    }

    Traffic_lights.prototype.toGreen = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
        this.switchTime = new Date();
        this.state = 'green'
        this._timeout = setTimeout(function () {
            this.toYellow();
        }.bind(this), this._config[this.state])
    }

    Traffic_lights.prototype.toRed = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
        this.switchTime = new Date();
        this.state = 'red'
        this._timeout = setTimeout(function () {
            this.toGreen();
        }.bind(this), this._config[this.state])
    }

    Traffic_lights.prototype.getState = function() { // current state
        if (this.tram_mode)
            return 'green'
        else
            return this.state
    };
    
    Traffic_lights.prototype.stopIt = function() { // Stop switching lights
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
    }

    Traffic_lights.prototype.passTram = function() {
        console.log("Трамвай на подходе");
        setTimeout(function() {
            this.tram_mode = true;
            console.log("Трамвай пошел");
            setTimeout(function() {
                this.tram_mode = false; // Трамвай как-будто не проезжал, таймер все это время шел, как обычно.
                // Можно, конечно, было понимать, что надо вернуться в старое состояние до трамвая
                // Проверим, так ли много осталось от текущего цвета, стоит ли в него переходить
                if (this.switchTime - new Date() > this.percent_of_curr_color * this._config[this.state])
                    switch(this.state) {
                        case 'green':
                            this.toYellow();
                            break;
                        case 'yellow':
                            this.toRed();
                            break;
                        case 'red':
                            this.toGreen();
                            break;
                    }
            }.bind(this), this.green_for_tram)
        }.bind(this), this.wait_for_tram)
    }

    // Traffic_lights.prototype.tramPassed = function() {
        
    // }

    Traffic_lights.prototype.onEventEmmiter = function(event_emmiter) {
        event_emmiter.addListener('Tram is comming', function() {this.passTram();}.bind(this))
    }

}
// Экспортируем
module.exports = Traffic_lights;
//exports.Traffic_lights = Traffic_lights;