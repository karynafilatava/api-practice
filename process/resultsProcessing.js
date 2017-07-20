var fs = require('fs');

var parseResponse = function(res) {
	return new Promise((resolve, reject) => {
		res = JSON.parse(res);
		if (res.response) {
			resolve(res.response);
		} else {
			throw new Error(res.error.error_msg);
		}
	});
};

var writeResults = function(users) {
	return new Promise((resolve, reject) => {
		var filename = 'mutualFriends' + iduser1 + '_' + iduser2 + '.json';
		fs.writeFile(filename, JSON.stringify(users, null, 2), (err) => {
			if (err) {
				reject(err);
			} else {
				console.log(`Info was written to json file.`);
				resolve();
			}
		});
	})
};

module.exports.writeResults = writeResults;
module.exports.parseResponse = parseResponse;
