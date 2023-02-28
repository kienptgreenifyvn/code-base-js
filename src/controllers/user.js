// utils
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const { UserRole } = require('../constants/enum');

// services
const userService = require('../services/user');
const securityService = require('../services/security');
// Constants
const constants = require('../constants/constants');

/**
 * Login account with email, password
 */
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    logger.info(`[createUser]: newUser -> ${JSON.stringify(req.body)}`);

    const existedEmail = await userService.getUserByEmail(newUser?.email);
    if (existedEmail) {
      logger.debug(`[createUser]: existedEmail -> ${httpResponses.EMAIL_EXISTED}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.EMAIL_EXISTED}`,
      });
    }

    const createUser = await userService.createUser(newUser);
    console.log(createUser);
    logger.debug(`[createUser]: createUser -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      createUser,
    });
  } catch (error) {
    logger.error(`[createUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  createUser,
};
