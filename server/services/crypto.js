var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var config = require('../config/config');

function encryptPassword(password, callback){
	bcrypt.hash(password, 10, callback);
}

function comparePassword(password, hash, callback) {
	bcrypt.compare(password, hash, callback);
}
function generateToken(userId) {
	return jwt.sign({userId: userId}, config.jwt.password, {
		expiresIn: config.jwt.exprireAt // expires in 24 hours
	});
}

function verifyToken(token) {
	if(!token) return;
	return  jwt.decode(token, config.jwt.password)
}

module.exports = {
	encryptPassword: encryptPassword,
	comparePassword: comparePassword,
	generateToken: generateToken,
	verifyToken: verifyToken
};
