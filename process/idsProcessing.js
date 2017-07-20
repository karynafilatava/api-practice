var filterUniqueUsers = function(user, index, self) {
	return user != (iduser1 || iduser2) && self.indexOf(user) === index;
};

var getCommonFriendsIds = function(friends) {
	var commonFriendsIds = [];
	friends.forEach((friend) => {
		if (friend.common_friends.length > 0 && friend.id != iduser1 && friend.id != iduser2) {
			friend.common_friends.forEach((connection) => {
				commonFriendsIds.push(connection);
			})
		} 
	});
	if (commonFriendsIds.length === 0) {
		throw new Error('No connections were found.');
	}
	commonFriendsIds = commonFriendsIds.filter(filterUniqueUsers);
	console.log(`${commonFriendsIds.length} connections were found`);
	return commonFriendsIds.toString();
};

module.exports = getCommonFriendsIds;

