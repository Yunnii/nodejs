function requestFactory() {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
      return xhr;
  } 
    
  if (typeof XDomainRequest !== "undefined") {
      return new XDomainRequest();
  }
  return null;
}


function ajax(url, callback) {
	var xhr = requestFactory();
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					callback(xhr.responseText);
				}
		}
	};
	xhr.send();
}