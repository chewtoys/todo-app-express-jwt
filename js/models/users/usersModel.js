const { camelizeKeys } = require('humps');
const usersDAL = require('./usersDAL');

class User {
	//user create
	static async insert(userData) {
		console.log('Before insert' + JSON.stringify(userData));
		let user = await usersDAL.createUser(userData);
		return user;
	}
	//user login
	static async login(nameOrEmail, password) {
		try {
			console.log('try login...');
			const loggedUser = await usersDAL.login(nameOrEmail, password);
			return camelizeKeys(loggedUser);
		} catch (error) {
			throw error;
		}
	}
}

module.exports.User = User;
