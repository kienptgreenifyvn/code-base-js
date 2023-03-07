// utils
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');

// services
const quanHuyenService = require('../services/quanHuyen');
// Constants
const constants = require('../constants/constants');

/**
 * Login account with email, password, username
 */
const createQuanHuyen = async (req, res) => {
  try {
    const quanHuyen = req.body;
    logger.info(`[createQuanHuyen]: quanHuyen -> ${JSON.stringify(req.body)}`);

    const tenQuanHuyen = await quanHuyenService.getQuanHuyenByName(quanHuyen?.tenQuanHuyen);
    if (tenQuanHuyen) {
      logger.debug(`[createQuanHuyen]: tenQuanHuyen -> ${httpResponses.QUAN_HUYEN_DA_TON_TAI}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.QUAN_HUYEN_DA_TON_TAI}`,
      });
    }

    await quanHuyenService.createQuanHuyen(quanHuyen);
    logger.debug(`[createQuanHuyen]: createQuanHuyen -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[createQuanHuyen]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getAllQuanHuyen = async (req, res) => {
  try {
    const { search, limit, page } = req.query;
    logger.info(`[getAllQuanHuyen]: query -> ${JSON.stringify(req.query)}`);

    const pagination = {
      limit: +limit || constants.DEFAULT_LIMIT,
      page: +page || constants.DEFAULT_PAGE,
    };
    logger.info(`[getAllQuanHuyen]: pagination -> ${JSON.stringify(pagination)}`);

    const quanHuyens = await quanHuyenService.getAllQuanHuyen(search, pagination);
    total = quanHuyens.length;
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      data: {
        quanHuyens,
        pagination: {
          ...pagination,
          total,
        },
      },
    });
  } catch (error) {
    logger.error(`[getAllQuanHuyen]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getQuanHuyenById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[getQuanHuyenById]: id -> ${JSON.stringify(req.params)}`);

    const quanHuyen = await quanHuyenService.getQuanHuyenById(id);
    if (!quanHuyen) {
      logger.debug(`[getQuanHuyenById]: quanHuyen -> ${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`,
      });
    }
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      quanHuyen,
    });
  } catch (error) {
    logger.error(`[getQuanHuyenById]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const updateQuanHuyen = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    logger.info(`[updateQuanHuyen]: id -> ${JSON.stringify(req.params)}. update -> ${JSON.stringify(req.body)}`);

    const quanHuyen = await quanHuyenService.getQuanHuyenById(id);
    if (!quanHuyen) {
      logger.debug(`[getQuanHuyenById]: quanHuyen -> ${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`,
      });
    }

    await quanHuyenService.updateQuanHuyen(id, update);
    logger.debug(`[updateQuanHuyen]: updateQuanHuyen -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[updateQuanHuyen]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const deleteQuanHuyen = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[deleteQuanHuyen]: id -> ${JSON.stringify(req.params)}.`);

    const quanHuyen = await quanHuyenService.getQuanHuyenById(id);
    if (!quanHuyen) {
      logger.debug(`[getUserById]: quanHuyen -> ${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_QUAN_HUYEN}`,
      });
    }

    await quanHuyenService.deleteQuanHuyen(id);
    logger.debug(`[deleteQuanHuyen]: deleteQuanHuyen -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[deleteQuanHuyen]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  createQuanHuyen,
  getAllQuanHuyen,
  getQuanHuyenById,
  updateQuanHuyen,
  deleteQuanHuyen,
};
