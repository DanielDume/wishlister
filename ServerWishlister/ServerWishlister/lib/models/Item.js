const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    shop: { type: String },
    price: { type: Number },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item;
module.exports.mongoose = mongoose;