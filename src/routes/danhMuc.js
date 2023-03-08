const express = require('express');
const danhMucRoute = express.Router();

const danhMucController = require('../controllers/danhMuc');
const { UserRole } = require('../constants/enum');

const { requireLogin, checkPermissions } = require('../middleware/permission');

danhMucRoute.post(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  danhMucController.createDanhMuc
);

danhMucRoute.get(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  danhMucController.getAllDanhMuc
);

danhMucRoute.get('/:id', requireLogin, danhMucController.getDanhMucById);

danhMucRoute.put(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  danhMucController.updateDanhMuc
);

danhMucRoute.delete(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  danhMucController.deleteDanhMuc
);

module.exports = danhMucRoute;
