const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;

var priceRangeSchema = new Schema({
    value: {type: String, required: true},
    lowerBound: {type: Number},
    upperBound: {type: Number},
});

var PriceRange = mongoose.model('PriceRange', priceRangeSchema);

module.exports.PriceRange = PriceRange;
module.exports.mongoose = mongoose;