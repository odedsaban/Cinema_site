const mongoose = require('mongoose');
let membersSchema = mongoose.Schema;
let member = new membersSchema({
    name: String,
    email: String,
    city: String,
})
module.exports = mongoose.model('members',member);