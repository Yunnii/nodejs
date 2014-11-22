function HttpRequest()
{
    this.xmlHttp = null;

    HttpRequest.prototype.create = function ()
    {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }

        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
    }

    HttpRequest.prototype.getRequest = function(url, callback)
    {
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4)
            {
                if(xmlhttp.status == 200)
                {
                    callback(xmlhttp.responseText);
                }
            }
        };

        xmlhttp.send();
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
    exports.HttpRequest = HttpRequest;
}