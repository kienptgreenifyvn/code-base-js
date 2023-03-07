const express = require('express');
const quanHuyenRoute = express.Router();

const quanHuyenController = require('../controllers/quanHuyen');
const { UserRole } = require('../constants/enum');

const { requireLogin, checkPermissions } = require('../middleware/permission');

quanHuyenRoute.post(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  quanHuyenController.createQuanHuyen
);

quanHuyenRoute.get(
  '/',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  quanHuyenController.getAllQuanHuyen
);

quanHuyenRoute.get('/:id', requireLogin, quanHuyenController.getQuanHuyenById);

quanHuyenRoute.put(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  quanHuyenController.updateQuanHuyen
);

quanHuyenRoute.delete(
  '/:id',
  requireLogin,
  checkPermissions(UserRole.ADMIN, UserRole.UBTVSBN, UserRole.VHTTDL),
  quanHuyenController.deleteQuanHuyen
);

module.exports = quanHuyenRoute;
