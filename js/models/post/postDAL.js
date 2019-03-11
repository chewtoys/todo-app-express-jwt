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
//https://stackoverflow.com/questions/37255577/knex-what-is-the-appropriate-way-to-create-an-array-from-results
// https://stackoverflow.com/questions/39805736/get-join-table-as-array-of-results-with-postgresql-nodejs
//https://stackoverflow.com/questions/37255577/knex-what-is-the-appropriate-way-to-create-an-array-from-results
/* knex('users')
    .innerJoin('user_emails','users.id','user_emails.user_id')
    .select([
      'users.id as userID',
      'users.name as userName',
      knex.raw('ARRAY_AGG(user_emails.adress) as email')
    ])
    .groupBy('users.id','users.name') */
module.exports.getAllPostWithComments = async () => {
	console.log('getting data. with comments...........');
	//select posts.id,posts.title,posts.details,posts.user_id, json_agg(comm.*) from posts left join comments as comm on posts.id=comm.posts_id  group by posts.id
	let allpost = knex
		.select([
			'posts.id',
			'posts.title',
			'posts.details',
			'posts.user_id',
			knex.raw('json_agg(comm.*) as all_comments')
		])
		.from('posts')
		.leftJoin('comments as comm', 'posts.id', 'comm.posts_id')
		.groupBy('posts.id');
	return allpost;
};

module.exports.deletePost = async post_id => {
	console.log('getting data............' + post_id);
	return knex
		.delete('*')
		.from('comments')
		.where('posts_id', post_id)
		.then(function() {
			return knex
				.delete('*')
				.from('posts')
				.where('id', post_id);
		});
};
