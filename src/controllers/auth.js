// utils
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const { UserRole } = require('../constants/enum');

// services
const userService = require('../services/user');
const securityService = require('../services/security');
const authService = require('../services/auth');
// Constants
const constants = require('../constants/constants');

/**
 * Login account with email, password
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`[login]: req -> ${JSON.stringify(req.body)}`);

    // Validate
    const existedUser = await userService.getUserByEmail(email);
    if (!existedUser) {
      logger.debug(`[login]: getUserByEmail -> ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.USER_NOT_FOUND}`,
      });
    }
    logger.debug(`[login]: getUserByEmail -> ${httpResponses.SUCCESS}`);

    const isComparedPassword = securityService.comparePassword(password, existedUser.password);
    if (!isComparedPassword) {
      logger.debug(`[login]: comparePassword -> ${httpResponses.ERROR_PASSWORD_INCORRECT}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.ERROR_PASSWORD_INCORRECT}`,
      });
    }
    logger.debug(`[login]: comparePassword -> ${httpResponses.SUCCESS}`);

    // Init user
    let user = {
      id: existedUser.id,
      role: existedUser.role,
    };
    const tokenAuth = authService.generateToken(user);
    logger.debug(`[login]: generateToken -> ${httpResponses.SUCCESS}`);

    let data = {};
    switch (existedUser.role) {
      case UserRole.ADMIN:
        const dataAdmin = await userService.getUserById(user.id);
        if (!dataAdmin) {
          logger.debug(`[login]: dataAdmin -> ${httpResponses.USER_NOT_FOUND}`);
          return res.badRequest(httpResponses.USER_NOT_FOUND);
        }
        logger.debug(`[login]: dataAdmin -> ${httpResponses.SUCCESS}`);

        data = { name: dataAdmin?.name };
        user = {
          ...user,
          data: data,
        };
        logger.info(`[login] dataAdmin -> ${httpResponses.SUCCESS}`);
        break;

      case UserRole.USER:
        const dataUser = await userService.getUserById(user.id);
        if (!dataUser) {
          logger.debug(`[login]: dataUser -> ${httpResponses.USER_NOT_FOUND}`);
          return res.badRequest(httpResponses.USER_NOT_FOUND);
        }
        logger.debug(`[login]: dataUser -> ${httpResponses.SUCCESS}`);

        data = { name: dataUser?.name };
        user = {
          ...user,
          data: data,
        };
        logger.info(`[login] dataUser -> ${httpResponses.SUCCESS}`);
        break;

      default:
        break;
    }

    logger.debug(`[login]: responses -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      data: {
        user,
        token: tokenAuth,
      },
    });
  } catch (error) {
    logger.error(`[login]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  login,
};
