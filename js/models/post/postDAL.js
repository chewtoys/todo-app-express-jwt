//https://github.com/i0natan/nodebestpractices
const knex = require('../../dbmiddleware/knex.js');
const { message } = require('./postErrorMessage');

const checkInputError = target => Object.keys(target).every(eachElem => target[eachElem] !== '');

module.exports.createPost = async (postData, users_id) => {
	console.log('post adding.....');
	try {
		if (!checkInputError) {
			throw new Error(message.inputError);
		}
		//console.log(JSON.stringify(postData));
		console.log(users_id);
		const data = [
			{
				title: postData.title,
				details: postData.details,
				user_id: users_id
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
	console.log('getting data............');
	return knex.select('*').from('posts');
};
//get only posted data with comments
module.exports.getAllPostWithComments = async () => {
	console.log('getting data. with comments...........');
	let allpost = knex
		.select('*')
		.from('posts')
		.innerJoin('comments', 'posts.id', 'comments.posts_id');

	return allpost;
};
