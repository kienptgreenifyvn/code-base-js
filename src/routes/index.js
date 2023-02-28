const express = require('express');

const indexRoute = express.Router();

const authRoute = require('./auth');
const userRoute = require('./user');

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', userRoute);

module.exports = indexRoute;
