//import bcrypt
const bcrypt = require('bcrypt');

module.exports.makeRandomString = length => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

module.exports.hash = val => {
	const saltRounds = 10;

	return bcrypt.hashSync(val, saltRounds);
};
//compare hass pasword using bcrypt
module.exports.compareHash = async (plain, hash) => {
	const match = await bcrypt.compare(plain, hash);
	return match;
};
