const { knex } = require('../../db');
const { message } = require('./usersErrorgMessage.js');
const strings = require('../../lib/strings.js');
const constants = require('../constants.js');
const ModelError = require('../modelError');
const checkInputError = target => Object.keys(target).every(eachElem => target[eachElem] !== '');

//create user
module.exports.createUser = async usersData => {
	try {
		if (!checkInputError(usersData)) {
			throw new Error(message.inputError);
		}
		let result = knex('users').insert(usersData);
		return result;
	} catch (error) {
		throw error;
	}
};
module.exports.login = async (name, pass) => {
	const user = await knex('users')
		.where('name', name)
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
