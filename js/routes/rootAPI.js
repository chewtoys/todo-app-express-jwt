const express = require('express');
const { usersAPI } = require('../models/users');

const router = express.Router();

module.exports = () => {
	router.use('/user', usersAPI);

	return router;
};
