//read any file from system
const fs = require('fs');
//auth0 library
const jwt = require('jsonwebtoken');
//read file path
const path = require('path');
//RSA key generate
//first command and the tutoral link https://www.devco.net/archives/2006/02/13/public_-_private_key_encryption_using_openssl.php
//openssl genrsa -out private-key.pem 1024
//second command
//openssl rsa -in private-key.pem -out public-key.pem -outform PEM -pubout
//read private key from keys location
const jwtPrivateKey = path.resolve('') + '/keys/private-key.pem';
//read pbulic key form keys location/directory
const jwtPublicKey = path.resolve('') + '/keys/public-key.pem';
// generate tokey for jwt with jwtSign method
//async method and arrow functions of javascript
module.exports.generateToken = async (id, name, type) => {
	//create payload object
	const payload = {
		id: id,
		name: name,
		type: type
	};
	//jwtSign is a async/Promise function, so you need to call awit way
	const token = await jwtSign(payload);
	return token;
};
//export verifyToken async method using module.exports

module.exports.verifyToken = async token => {
	const result = await jwtVerify(token);
	return result;
};
/* The payload of the token is where you actually get to convey 
your information to the application. To try and make JWTs more
interoperable between various applications, some standards have 
been set in place to define what and how certain data is communicated.
This is done using "claims" */
module.exports.getPayloadFromToken = async token => {
	const payload = await jwtVerify(token);
	return payload;
};

//create jwtSign method
/* The Promise that 
is either resolved or rejected is called “settled”, as opposed to a “pending” Promise.
The executor should call only one resolve or one reject . The promise's state change is final. */
const jwtSign = payload => {
	const options = {
		algorithm: 'RS256',
		expiresIn: '24h'
	};
	//return promising way
	return new Promise((resolve, reject) => {
		try {
			const pKey = fs.readFileSync(jwtPrivateKey);

			//jwt sign method take three parameter 1. payload object, 2. private key, 3. options that contain algorithm and expiresin
			const token = jwt.sign(payload, pKey, options);

			resolve(token);
		} catch (err) {
			reject(err);
		}
	});
};

/* create token jwtVerify method Promising way
The promise that is either resovled or jected is called "settled", as opposed to a pending promise
the executor should call only on resolve or one reject. the promise's state change is final. */
const jwtVerify = token => {
	const options = {
		algorithm: ['RS256']
	};
	return new Promise((resolve, reject) => {
		try {
			//read public key
			const publicKey = fs.readFileSync(jwtPublicKey);
			//using jwt verify method that is taken three arguments like sign method

			const result = jwt.verify(token, publicKey, options);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};
