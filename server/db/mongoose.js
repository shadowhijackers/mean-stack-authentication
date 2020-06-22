var mongoose = require('mongoose');

var config = require('../config/config');

function connect(){
	mongoose.connect('mongodb://localhost/'+ config.db.name +'?authSource=admin', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		user:config.db.user,
		pass: config.db.password
	}).then(() => console.log('database connection successful'))
		.catch((err) => console.error('DB:CONNECTION:ERROR', err));
}

module.exports = {
	connect: connect
};
