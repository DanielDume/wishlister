const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/WishlisterDatabase', {
    useMongoClient: true
  });

module.exports.mongoose = mongoose;