const express = require('express');
const router = express.Router();
const User = require('./usersModel');
const { check, validationResult } = require('express-validator/check');

const usersLogin = require('./usersModel.js');
const jwt = require('../../middleware/jwt.js');

router.post(
	'/create',
	[
		// username must be an email
		check('name').isEmail(),
		// password must be at least 5 chars long
		check('password').isLength({ min: 5 })
	],
	async (req, res) => {
		console.log('user request accepted...');
		const errors = validationResult(req);
		if (!errors) {
			return res.status(422).json({ errors: errors.array() });
		}

		const users = await User.User.insert(req.body);
		return res.json(users);
	}
);
router.post('/login', async (req, res) => {
	console.log('try to login...');
	try {
		let nameOrEmail = req.body.name;
		let password = req.body.password;

		let user = await User.User.login(nameOrEmail, password);
		res.json(user);
	} catch (error) {
		res.json(error.message);
	}
	const users = await User.User.insert(req.body);
	return res.json(users);
});
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
						type: 'Bearer'
					};
					usersLogin.User.update(users.id, token);
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
module.exports.usersAPI = router;
