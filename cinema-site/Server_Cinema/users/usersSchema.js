const mongoose = require('mongoose');

let UsersSchema = mongoose.Schema({
    username: String,
    password: String,
})
module.exports = mongoose.model('users',UsersSchema);