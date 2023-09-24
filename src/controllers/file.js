// Constants
const { FILE_ERR_CODE } = require('../constants/constants');

// Utils
const httpResponses = require('../utils/httpResponses');

const fileHelpers = require('../helper/file');
const fileService = require('../services/file');
const logger = require('../utils/logger');

/**
 * Upload single file
 * @param {*} req
 * @param {*} res
 * @returns
 */
const uploadSingleFile = async (req, res) => {
  try {
    const file = req.file;
    const hinhAnh = req.body;
    hinhAnh.uri = fileHelpers.getImgUrlName(file);
    logger.debug(`[uploadSingleFile] hinhAnh -> ${JSON.stringify(req.body)}`);

    if (!file) {
      logger.debug(`[uploadSingleFile] file -> ${httpResponses.FILE_IS_REQUIRED}`);
      res.badRequest(httpResponses.FILE_IS_REQUIRED);
    }

    await fileService.createHinhAnh(hinhAnh);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: httpResponses.UPLOAD_FILE_SUCCESSFULLY,
      data: {
        link: fileHelpers.getImgUrlName(file),
      },
    });
  } catch (err) {
    if (err.code == FILE_ERR_CODE.LIMIT_FILE_SIZE) {
      return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
        success: false,
        message: httpResponses.FILE_TOO_LARGE,
      });
    }

    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${httpResponses.COULD_NOT_UPLOAD_FILE}. ${err.message}`,
    });
  }
};

/**
 * Upload multi file
 * @param {*} req
 * @param {*} res
 * @returns
 */
const uploadMultiFiles = async (req, res) => {
  try {
    const files = req.files;
    const hinhAnh = req.body;
    logger.debug(`[uploadMultiFiles]`);

    if (!files) {
      logger.debug(`[uploadSingleFile] file -> ${httpResponses.FILES_IS_REQUIRED}`);
      res.badRequest(httpResponses.FILES_IS_REQUIRED);
    }
    for (const item of files) {
      hinhAnh.uri = item?.filename;
      await fileService.createHinhAnh(hinhAnh);
    }

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: httpResponses.UPLOAD_FILE_SUCCESSFULLY,
      data: {
        links: fileHelpers.getImgUrlsName(files),
      },
    });
  } catch (err) {
    if (err.code == FILE_ERR_CODE.LIMIT_FILE_SIZE) {
      return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
        success: false,
        message: httpResponses.FILE_TOO_LARGE,
      });
    }

    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${httpResponses.COULD_NOT_UPLOAD_FILE}. ${err.message}`,
    });
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultiFiles,
};
