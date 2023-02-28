const httpResponses = require('../utils/httpResponses');
const logger = require('../utils/logger');
const userService = require('../services/user');
const authService = require('../services/auth');
const { UserRole } = require('../constants/enum');

const requireLogin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      const user = authService.verifyToken(token);
      logger.info(`[requireLogin]: verifyToken -> ${httpResponses.SUCCESS}`);
      req.session.user = user;
      switch (user.role) {
        case UserRole.ADMIN:
          const admin = await userService.getUserById(user.id);
          if (!admin) {
            logger.debug(`[requireLogin]: getUserAdmin -> ${httpResponses.ADMIN_NOT_FOUND}`);
            return res.status(httpResponses.HTTP_STATUS_UNAUTHORIZED).json({
              success: false,
              message: `${httpResponses.ADMIN_NOT_FOUND}`,
            });
          }
          req.session.admin = admin;
          break;
        case UserRole.USER:
          const getUser = await userService.getUserById(user.id);
          if (!user) {
            logger.debug(`[requireLogin]: getUser -> ${httpResponses.SUPER_ADMIN_NOT_FOUND}`);
            return res.status(httpResponses.HTTP_STATUS_UNAUTHORIZED).json({
              success: false,
              message: `${httpResponses.SUPER_ADMIN_NOT_FOUND}`,
            });
          }
          req.session.getUser = getUser;
          break;
        default:
          break;
      }
      logger.info(`[requireLogin]: ${JSON.stringify(user)}`);
      next();
    } else {
      logger.debug(`[requireLogin]: user -> ${httpResponses.UNAUTHORIZED}`);
      return res.unauthorized();
    }
  } catch (err) {
    logger.error(`[requireLogin]: error -> ${err.message}`);
    return res.internalServer(err.message);
  }
};

const checkPermissions = (...roles) => {
  return (req, res, next) => {
    try {
      const user = req.session.user;
      logger.info(`[checkPermissions]: userId -> ${user._id}`);
      if (Array.isArray(roles) && roles.includes(user.role)) {
        logger.debug(`[checkPermissions]: ${httpResponses.CAN_GET_ACCESS}`);
        return next();
      }
      logger.debug(`[checkPermissions]: error -> ${httpResponses.PERMISSION_DENIED}`);
      return res
        .status(httpResponses.HTTP_STATUS_UNAUTHORIZED)
        .json({ success: false, message: `Error: ${httpResponses.PERMISSION_DENIED}` });
    } catch (err) {
      logger.error(`[checkPermissions]: error -> ${err.message}`);
      res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({ success: false, message: `Error: ${err.message}` });
    }
  };
};

module.exports = {
  requireLogin,
  checkPermissions,
};
