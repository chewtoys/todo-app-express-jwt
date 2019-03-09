const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
//RSA key generate
//first command and the tutoral link https://www.devco.net/archives/2006/02/13/public_-_private_key_encryption_using_openssl.php
//openssl genrsa -out private-key.pem 1024
//second command
//openssl rsa -in private-key.pem -out public-key.pem -outform PEM -pubout
