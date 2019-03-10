const { camelizeKeys } = require('humps');
const postDAL = require('./postDAL');
class Post {
	//create post
	static async createPost(postData) {
		try {
			console.log('called post class...');
			let post = await postDAL.createPost(postData);
			return camelizeKeys(post);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}

	//get post data without users comments
	static async getPostWithoutComments() {
		console.log('getting posting data from postDAL');
		try {
			let post = await postDAL.getAllPostWithoutComment();
			return camelizeKeys(post);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}
}

module.exports.Post = Post;
