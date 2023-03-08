const express = require('express');

const indexRoute = express.Router();

const authRoute = require('./auth');
const userRoute = require('./user');
const quanHuyenRoute = require('./quanHuyen');
const fileRoute = require('./file');
const danhMucRoute = require('./danhMuc');

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', userRoute);
indexRoute.use('/quanhuyen', quanHuyenRoute);
indexRoute.use('/files', fileRoute);
indexRoute.use('/danhmuc', danhMucRoute);

module.exports = indexRoute;
