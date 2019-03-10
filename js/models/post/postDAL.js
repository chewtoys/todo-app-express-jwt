//https://github.com/i0natan/nodebestpractices
const knex = require('../../dbmiddleware/knex.js');
const { message } = require('./postsErrorMessage');

const checkInputError = target => Object.keys(target).every(eachElem => target[eachElem] !== '');

module.exports.createPost = async postData => {
	console.log('post adding.....');
	try {
		if (!checkInputError) {
			throw new Error(message.inputError);
		}
		console.log(JSON.stringify(postData));
		const data = [
			{
				title: postData.name,
				details: postData.details,
				user_id: postData.user_id
			}
		];
		let result = knex('posts').insert(data);
		return result;
	} catch (error) {
		throw error;
	}
};

//get only posted data without comments
module.exports.getAllPostWithoutComment = async () => {
	return knex.select('*').from('posts');
};
