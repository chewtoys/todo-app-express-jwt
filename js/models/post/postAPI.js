const express = require('express');
const router = express.Router();
const Post = require('./postModel');
const Users = require('../users/usersModel');
//const token = req.headers.authorization.split(" ")[1]
router.get('/getAllPostWithoutComment', async (req, res) => {
	try {
		/* const token = req.headers.authorization.split(' ')[1];
		let users = await Users.User.userTokenCheck(token);
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		} */
		let allPostWithComments = await Post.Post.getPostWithoutComments();
		res.send(allPostWithComments);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
//get all post with related comments
router.get('/getAllPostWithComment', async (req, res) => {
	try {
		/* const token = req.headers.authorization.split(' ')[1];
		let users = await Users.User.userTokenCheck(token);
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		} */
		let allPostWithComments = await Post.Post.getPostWithComments();
		res.send(allPostWithComments);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});

router.post('/create', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		console.log('get post data');
		let users = await Users.User.userTokenCheck(token);
		console.log(users[0].id);
		console.log('users id.....');
		if (!users) {
			let err = {
				error: 'Not authorized'
			};
			res.status(401).send(JSON.stringify(err));
		}
		console.log('llllllllllllllllll.............');
		let posts = await Post.Post.createPost(req.body, users[0].id);
		res.send(posts);
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
router.get('/delete/:id', async (req, res) => {
	console.log('deleting....');
	try {
		let response = {
			message: 'post deleted...'
		};
		let post_id = req.params.id;
		console.log(post_id);
		let deletes = await Post.Post.deletePost(post_id);
		if (deletes) {
			res.send(JSON.stringify(response));
		} else {
			console.log('post does not delete');
		}
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
router.get('/getPostById/:id', async (req, res) => {
	console.log('deleting....');
	try {
		let post_id = req.params.id;
		console.log(post_id);
		let deletes = await Post.Post.getPostById(post_id);
		if (deletes) {
			res.send(JSON.stringify(deletes));
		} else {
			console.log('post does not delete');
		}
	} catch (error) {
		res.status(401).send(JSON.stringify(error.message));
	}
});
module.exports.postsAPI = router;
