const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    _bcrypt = require('bcrypt'),
    _config = require('../config')(process.env.MODE || 'dev');

const User = new _Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    phone: String,
});

User.index({
    username: 1
}, {
        unique: true
    });

User.pre("save", function (next) {
    if (!this.password || !this.username) throw new Error("username and password is required");
    this.password = _bcrypt.hashSync(this.password, _config.auth.saltRounds);
    next();
});

User.methods.confirmPassword = function (password) {
    return _bcrypt.compareSync(password, this.password);
};

module.exports = {
    schema: User,
    model: _mongoose.model('User', User)
};