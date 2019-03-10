const express = require('express');
const router = express.Router();
const Post = require('./postModel');
const Users = require('../users/usersModel');
//const token = req.headers.authorization.split(" ")[1]
router.get('/getAllPostWithoutComment', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		let users = await Users.User.userTokenCheck(token);
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		}
		let allPostWithComments = await Post.Post.getPostWithoutComments();
		res.send(allPostWithComments);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});

router.post('/create', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		//console.log(token);
		let users = await Users.User.userTokenCheck(token);
		console.log(JSON.stringify(users));
		console.log('users id.....');
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		}
		console.log('llllllllllllllllll.............');
		let posts = Post.Post.createPost(req.body, users[0].id);
		res.send(posts);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
module.exports.postsAPI = router;
