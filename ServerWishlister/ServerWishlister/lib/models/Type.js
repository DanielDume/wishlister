const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;

var typeSchema = new Schema({
    name: {type: String, required: true, unique: true},
});

var Type = mongoose.model('Type', typeSchema);

module.exports.Type = Type;
module.exports.mongoose = mongoose;