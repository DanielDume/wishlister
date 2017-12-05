const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {type: string, required: true}
})

var Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item;