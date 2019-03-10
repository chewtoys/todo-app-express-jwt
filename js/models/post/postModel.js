const { camelizeKeys } = require('humps');
const postDAL = require('./postDAL');
class Post {
	//create post
	static async createPost(postData, user_id) {
		try {
			console.log('called post class...');
			let post = await postDAL.createPost(postData, user_id);
			return camelizeKeys(post);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}

	//get post data without users comments
	static async getPostWithoutComments() {
		//console.log('getting posting data from postDAL');
		try {
			let post = await postDAL.getAllPostWithoutComment();
			//console.log(JSON.stringify(post));
			return camelizeKeys(post);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}

	//get post data witht users comments
	static async getPostWithComments() {
		console.log('getting posting data from postDAL');
		try {
			let post = await postDAL.getAllPostWithComments();
			return camelizeKeys(post);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}
}

module.exports.Post = Post;
