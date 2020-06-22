const crypto = require('../services/crypto');

function auth(req, res, next) {
	const accessToken = req.headers['access-token'];
	if (accessToken){
		if(crypto.verifyToken(accessToken)){
			next();
		}else{
			res.status(401).send({
				error: 'Session was expired'
			})
		}
	}else {
		res.status(401).send({
			error: 'You dont have access to this api'
		})
	}
}

module.exports = auth;
