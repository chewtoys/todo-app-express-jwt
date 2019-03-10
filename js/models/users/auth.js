const express = require('express');
const router = express.Router();
const usersLogin = require('./usersModel.js');
const jwt = require('../../middleware/jwt.js');

//user login
router.post('/user_login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	usersLogin.User.login(email, password)
		.then(users => {
			jwt.generateToken(users.id, users.email, 'user')
				.then(token => {
					const response = {
						token: token,
						user_id: users.id
					};
					res.json(response);
				})
				.catch(err => {
					console.log('user login generate token error: ', err);
					res.status(500).end();
				});
		})
		.catch(err => {
			res.status(401)
				.send(err.message)
				.end();
		});
});
