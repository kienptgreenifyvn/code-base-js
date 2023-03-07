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
 * Login account with email, password, username
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

    const existedUserName = await userService.getUserByEmail(newUser?.userName);
    if (existedUserName) {
      logger.debug(`[createUser]: existedUserName -> ${httpResponses.USER_NAME_EXISTED}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.USER_NAME_EXISTED}`,
      });
    }

    const createUser = await userService.createUser(newUser);
    logger.debug(`[createUser]: createUser -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[createUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { search, limit, page } = req.query;
    logger.info(`[getAllUser]: query -> ${JSON.stringify(req.query)}`);

    const pagination = {
      limit: +limit || constants.DEFAULT_LIMIT,
      page: +page || constants.DEFAULT_PAGE,
    };
    logger.info(`[getAllServices]: pagination -> ${JSON.stringify(pagination)}`);

    const users = await userService.getAllUser(search, pagination);
    total = users.length;
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      data: {
        users,
        pagination: {
          ...pagination,
          total,
        },
      },
    });
  } catch (error) {
    logger.error(`[getAllUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[getUserById]: id -> ${JSON.stringify(req.params)}`);

    const user = await userService.getUserById(id);
    if (!user) {
      logger.debug(`[getUserById]: user -> ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.USER_NOT_FOUND}`,
      });
    }
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      user,
    });
  } catch (error) {
    logger.error(`[getAllUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    logger.info(`[updateUser]: id -> ${JSON.stringify(req.params)}. update -> ${JSON.stringify(req.body)}`);

    const user = await userService.getUserById(id);
    if (!user) {
      logger.debug(`[getUserById]: user -> ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.USER_NOT_FOUND}`,
      });
    }

    await userService.updateUser(id, update);
    logger.debug(`[updateUser]: updateUser -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[updateUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[deleteUser]: id -> ${JSON.stringify(req.params)}.`);

    const user = await userService.getUserById(id);
    if (!user) {
      logger.debug(`[getUserById]: user -> ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.USER_NOT_FOUND}`,
      });
    }

    await userService.deleteUser(id);
    logger.debug(`[deleteUser]: deleteUser -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[deleteUser]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
