const { camelizeKeys } = require('humps');
const commentsDAL = require('./commentsDAL');
class Comments {
	//create Comments
	static async createComments(commentsData) {
		try {
			console.log('called Comments class...');
			let Comments = await commentsDAL.createComments(commentsData);
			return camelizeKeys(Comments);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}

	//get Comments data witht users comments
	static async getAllCommentsByPostId(post_id) {
		console.log('getting Commentsing data from commentsDAL');
		try {
			let Comments = await commentsDAL.getAllCommentsByPostId(post_id);
			return camelizeKeys(Comments);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}
	static async deleteComments(comments_id) {
		console.log('commentsDAL calling ...' + comments_id);
		try {
			let Comments = await commentsDAL.deleteComments(comments_id);
			return camelizeKeys(Comments);
		} catch (error) {
			return camelizeKeys(error.message);
		}
	}
}

module.exports.Comments = Comments;
