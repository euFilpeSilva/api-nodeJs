const mongoose = require('mongoose');

const User = mongoose.model('User', {
    nome: String,
    email: String,
    password: String
})

module.exports = User;