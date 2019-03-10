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
	//user login
	static async update(user_id, token) {
		try {
			console.log('try to update...');
			const loggedUser = await usersDAL.update(user_id, token);
			return camelizeKeys(loggedUser);
		} catch (error) {
			throw error;
		}
	}
	//user login
	static async userTokenCheck(token) {
		try {
			//console.log('try to check token...');
			const loggedUser = await usersDAL.userTokenCheck(token);
			return camelizeKeys(loggedUser);
		} catch (error) {
			throw error;
		}
	}
}

module.exports.User = User;
