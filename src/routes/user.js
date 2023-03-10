const express = require('express');
const userRoute = express.Router();

const userController = require('../controllers/user');
const { UserRole } = require('../constants/enum');

const { requireLogin, checkPermissions } = require('../middleware/permission');
userRoute.post(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  userController.createUser
);

userRoute.get(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  userController.getAllUser
);

userRoute.get('/:id', requireLogin, userController.getUserById);

userRoute.put(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  userController.updateUser
);

userRoute.delete(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  userController.deleteUser
);

module.exports = userRoute;
