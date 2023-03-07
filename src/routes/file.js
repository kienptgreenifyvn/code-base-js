const express = require('express');
const fileRoute = express.Router();

const fileController = require('../controllers/file');
const fileHelpers = require('../helper/file');

fileRoute.post('/upload', fileHelpers.multer.single('file'), fileController.uploadSingleFile);

fileRoute.post('/upload-multi', fileHelpers.multer.array('files'), fileController.uploadMultiFiles);

module.exports = fileRoute;
