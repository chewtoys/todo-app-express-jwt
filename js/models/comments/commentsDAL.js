//https://github.com/i0natan/nodebestpractices
const knex = require('../../dbmiddleware/knex.js');
const { message } = require('./commentsErrorMessage');

const checkInputError = target => Object.keys(target).every(eachElem => target[eachElem] !== '');

module.exports.createComments = async commentsData => {
	console.log('comments adding.....');
	try {
		if (!checkInputError) {
			throw new Error(message.inputError);
		}
		const data = [
			{
				comments: commentsData.comments,
				posts_id: commentsData.post_id
			}
		];
		console.log(commentsData.post_id);
		let result = knex('comments').insert(data);
		return result;
	} catch (error) {
		throw error;
	}
};

//get only posted data without comments
module.exports.getAllCommentsByPostId = async post_id => {
	console.log('getting data............');
	return knex
		.select('*')
		.from('comments')
		.where('posts_id', post_id);
};

module.exports.deleteComments = async comments_id => {
	console.log('getting data............');
	return knex('comments')
		.where('id', comments_id)
		.del();
};
