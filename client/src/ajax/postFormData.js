const postFormData = function(url, formData, callback) {
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() {
    	if (request.readyState === 4) {
        	try {
                const JSONRes = JSON.parse(request.responseText);
                return callback(null, request.status, JSONRes);
            } catch (err) {
                return callback(err);
            }
    	}
    }
    request.onerror = function(err) {
        return callback(err);
    }

    // formData.append();
    request.send(formData);
}

export default postFormData;
