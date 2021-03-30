const mongoose = require('mongoose');
let subsciptionSchema = mongoose.Schema;
let subscription = new subsciptionSchema({
    memberid: String,
    movies: [{movieid:String, date: Date}],
})
module.exports = mongoose.model('subscriptions',subscription);