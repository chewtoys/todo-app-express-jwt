const express = require('express');
const router = express.Router();
const Comments = require('./commentsModel');
const Users = require('../users/usersModel');

router.post('/create', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		console.log(token);
		let users = await Users.User.userTokenCheck(token);
		console.log(JSON.stringify(req.body));
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		}
		let comments = await Comments.Comments.createComments(req.body);
		res.send(comments);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
router.get('/delete/:id', async (req, res) => {
	try {
		let comments_id = req.params.id;
		let response = {
			message: 'comments deleted..'
		};
		let comments = await Comments.Comments.deleteComments(comments_id);
		if (comments) {
			res.send(JSON.stringify(response));
		}
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
module.exports.commentsAPI = router;
