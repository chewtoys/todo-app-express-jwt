//https://github.com/i0natan/nodebestpractices
const knex = require('../../dbmiddleware/knex.js');
const { message } = require('./usersErrorMessage');
const strings = require('../../lib/strings.js');
const constants = require('../contants.js');
const ModelError = require('../modelError');
const checkInputError = target => Object.keys(target).every(eachElem => target[eachElem] !== '');

//create user using name, email and password
module.exports.createUser = async usersData => {
	//console.log('user name: ');
	try {
		if (!checkInputError(usersData)) {
			throw new Error(message.inputError);
		}

		console.log(JSON.stringify(usersData));
		const data = [
			{
				user_name: usersData.name,
				password: strings.hash(usersData.password),
				email: usersData.email,
				role_id: 1
			}
		];
		let result = knex('users').insert(data);
		return result;
	} catch (error) {
		throw error;
	}
};
module.exports.login = async (name, pass) => {
	const user = await knex('users')
		.where('user_name', name)
		.orWhere('email', name)
		.first();
	if (!user) {
		throw new ModelError('not found', constants.NOTFOUND);
	}
	const match = await strings.compareHash(pass, user.password);
	if (!match) {
		throw new Error('login failed');
	}
	return user;
};
module.exports.update = async (user_id, token) => {
	const user = await knex('users')
		.where('id', '=', user_id)
		.update({ confirm_token: token });
	if (!user) {
		throw new ModelError('not found', constants.NOTFOUND);
	}

	return user;
};

module.exports.userTokenCheck = async token => {
	//console.log(token);
	const user = await knex
		.select('*')
		.from('users')
		.where('confirm_token', token);
	if (!user) {
		throw new ModelError('not found', constants.NOTFOUND);
	}
	//console.log(JSON.stringify(user));
	return user;
};
