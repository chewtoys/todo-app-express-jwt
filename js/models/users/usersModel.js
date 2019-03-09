const { camelizeKeys } = require('humps');
const usersDAL = require('./usersDAL');

class User {
	static async insert(userData) {
		console.log('Before insert' + userData);
		let user = await usersDAL.createUser(userData);
		return user;
	}
	static async login(nameOrEmail, password) {
		try {
			const loggedUser = await usersDAL.login(nameOrEmail, password);
			return camelizeKeys(loggedUser);
		} catch (error) {
			throw error;
		}
	}
}

module.exports.User = User;
