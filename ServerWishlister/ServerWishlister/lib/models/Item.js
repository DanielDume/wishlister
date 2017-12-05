const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {type: String, required: true},
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    shop: {type: String},
    price: {type: Number},
});

var Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item;
module.exports.mongoose = mongoose;