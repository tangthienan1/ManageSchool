const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('userdb', schema);

module.exports = UserModel;