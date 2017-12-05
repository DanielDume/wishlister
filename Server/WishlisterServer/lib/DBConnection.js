const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/WishlisterDatabase');

module.exports.mongoose = mongoose;