const express = require('express');
const { usersAPI } = require('../models/users');
const { postsAPI } = require('../models/post');
const { commentsAPI } = require('../models/comments');

const router = express.Router();

module.exports = () => {
	router.use('/user', usersAPI);
	router.use('/post', postsAPI);
	router.use('/comments', commentsAPI);
	return router;
};
