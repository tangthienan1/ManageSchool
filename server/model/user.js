const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('userdb', schema);

module.exports = UserModel;