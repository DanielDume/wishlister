const mongoose = require('./../DBConnection').mongoose;
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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
    role: {
        type: String,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// userSchema.pre('save', function(next){
//     var user = this;
//     let hash = crypto.createHash('sha256').update(user.password).digest('base64');
//     this.password = hash;
//     next();
// })

var User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.mongoose = mongoose;