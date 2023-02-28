const express = require('express');
const userRoute = express.Router();

const userController = require('../controllers/user');
const { UserRole } = require('../constants/enum');

const { requireLogin, checkPermissions } = require('../middleware/permission');
userRoute.post('/', requireLogin, checkPermissions(UserRole.ADMIN), userController.createUser);

module.exports = userRoute;
