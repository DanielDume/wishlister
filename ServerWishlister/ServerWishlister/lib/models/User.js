const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;
const crypto = require('crypto');

var userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

userSchema.pre('save', function(next){
    var user = this;
    let hash = crypto.createHash('sha256').update(user.password).digest('base64');
    this.password = hash;
    next();
})

var User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.mongoose = mongoose;