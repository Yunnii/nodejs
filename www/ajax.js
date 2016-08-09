// Создаем объект умеющий в AJAX-запросы, кроссплатформенно
var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]); //eslint-disable-line
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState === 4) {
            callback(x.responseText);
        }
    };
    if (method === 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data);
};

ajax.get = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
            query.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
    }
    ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync);
};

ajax.post = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
            query.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
    }
    ajax.send(url, callback, 'POST', query.join('&'), sync);
};
