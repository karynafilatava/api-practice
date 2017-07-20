var getInfo = require('./request/methodVkApi'),
	writeResults = require('./process/resultsProcessing').writeResults,
	parseResponse = require('./process/resultsProcessing').parseResponse,
	getCommonFriendsIds = require('./process/idsProcessing'),
	//enter token to your app with friends scope
	token = '';
	iduser1 = process.argv[2],
	iduser2 = process.argv[3];

console.log(`Seekeng for connections between ${iduser1} and ${iduser2}`);

getInfo('friends.get', 
		{
			user_id: iduser1, 
			count: 100, 
			access_token: token
		})
	.then((res) => parseResponse(res))
	.then((friendsUser1) => {
		return getInfo("friends.getMutual", 
						{
							source_uid: iduser2, 
							target_uids: friendsUser1.toString(), 
							access_token: token
						})
	})
	.then((res) => parseResponse(res))
	.then(getCommonFriendsIds)
	.then((commonFriendsIds) => {
		return getInfo('users.get', 
						{
							user_ids: commonFriendsIds, 
							fields: "sex, bdate", 
							access_token: token
						});
	})
	.then((res) => parseResponse(res))
	.then(writeResults)
	.catch((err) => console.error(err.message));