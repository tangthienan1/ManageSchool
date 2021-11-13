const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
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