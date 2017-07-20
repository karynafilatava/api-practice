var queryString = require('querystring'),
	https = require('https'),
	url = require('url');

var getUrl = function(method, params) {
	var myUrl = url.parse('https://api.vk.com');
	myUrl.pathname = 'method/' + method;
	myUrl.search = queryString.stringify(params);
	return url.format(myUrl);
};

var getInfo = function(method, params) {
	var url = getUrl(method, params);
	return new Promise((resolve, reject) => {
		https.get(url, (response) => {
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error(`Request failed with code ${response.statusCode}`));
			} else {
				var body = "";
				response.on('data', (chunk) => body += chunk);
				response.on('end', () => resolve(body));
			}
		});
	})
};

module.exports = getInfo;