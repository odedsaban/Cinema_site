const express = require('express');
const cors = require('cors');
const bodyarser = require('body-parser');

require('./configs/database');
const appCinema = express();

const UsersController = require('./users/usersController')

appCinema.use(express.json());
appCinema.use(express.urlencoded({extended:true}));
appCinema.use(cors());
appCinema.use('/users',UsersController);

appCinema.listen(8001);
console.log("Cinema server is up !")