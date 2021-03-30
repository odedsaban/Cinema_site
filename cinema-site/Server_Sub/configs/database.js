const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CinemaSite_Subscriptions-DB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})