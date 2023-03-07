// Constants
const { FILE_ERR_CODE } = require('../constants/constants');

// Utils
const httpResponses = require('../utils/httpResponses');

const fileHelpers = require('../helper/file');
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
    logger.debug(`[uploadSingleFile]`);

    if (!file) {
      logger.debug(`[uploadSingleFile] file -> ${httpResponses.FILE_IS_REQUIRED}`);
      res.badRequest(httpResponses.FILE_IS_REQUIRED);
    }

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: httpResponses.UPLOAD_FILE_SUCCESSFULLY,
      data: {
        link: fileHelpers.getImgUrl(file),
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
    logger.debug(`[uploadMultiFiles]`);

    if (!files) {
      logger.debug(`[uploadSingleFile] file -> ${httpResponses.FILES_IS_REQUIRED}`);
      res.badRequest(httpResponses.FILES_IS_REQUIRED);
    }

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: httpResponses.UPLOAD_FILE_SUCCESSFULLY,
      data: {
        links: fileHelpers.getImgUrls(files),
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
