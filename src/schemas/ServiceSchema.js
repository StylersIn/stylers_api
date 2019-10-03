const mongoose = require('mongoose'),
    _Schema = mongoose.Schema;


const Service = new _Schema({
    name: String,
    description: String,
    gender: {
        type: String,
        enum: ["HIM", "HER"],
    },
    coverImg: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = {
    schema: Service,
    model: mongoose.model('Service', Service),
}