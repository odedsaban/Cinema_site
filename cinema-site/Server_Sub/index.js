const express = require('express');
const cors = require('cors');
const bodyarser = require('body-parser');
require('./configs/database');

const appSub = express();

const MoviesController = require('./Movie/movieController')
const MembersController = require('./Members/membersController')
const SubscriptionController = require('./Subscriptions/subscriptionsController')

appSub.use(express.json());
appSub.use(express.urlencoded({extended:true}));

appSub.use(cors());
appSub.use('/movies',MoviesController);
appSub.use('/members',MembersController);
appSub.use('/subscriptions',SubscriptionController);
appSub.listen(8000);
console.log("Sub server is up !");


