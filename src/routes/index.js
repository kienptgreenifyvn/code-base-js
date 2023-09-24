const express = require('express');

const indexRoute = express.Router();

const authRoute = require('./auth');
const userRoute = require('./user');
const fileRoute = require('./file');

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', userRoute);
indexRoute.use('/files', fileRoute);

module.exports = indexRoute;
