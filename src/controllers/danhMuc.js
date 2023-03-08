// utils
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');

// services
const danhMucService = require('../services/danhMuc');
// Constants
const constants = require('../constants/constants');

/**
 * Login account with email, password, username
 */
const createDanhMuc = async (req, res) => {
  try {
    const danhMuc = req.body;
    logger.info(`[createDanhMuc]: danhMuc -> ${JSON.stringify(req.body)}`);

    const tendanhMuc = await danhMucService.getdanhMucByName(danhMuc?.tenDanhMuc);
    if (tendanhMuc) {
      logger.debug(`[createDanhMuc]: tenDanhMuc -> ${httpResponses.DANH_MUC_DA_TON_TAI}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.DANH_MUC_DA_TON_TAI}`,
      });
    }

    await danhMucService.createDanhMuc(danhMuc);
    logger.debug(`[createDanhMuc]: createDanhMuc -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[createDanhMuc]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getAllDanhMuc = async (req, res) => {
  try {
    const { search, limit, page } = req.query;
    logger.info(`[getAllDanhMuc]: query -> ${JSON.stringify(req.query)}`);

    const pagination = {
      limit: +limit || constants.DEFAULT_LIMIT,
      page: +page || constants.DEFAULT_PAGE,
    };
    logger.info(`[getAllDanhMuc]: pagination -> ${JSON.stringify(pagination)}`);

    const danhMucs = await danhMucService.getAllDanhMuc(search, pagination);
    total = danhMucs.length;
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      data: {
        danhMucs,
        pagination: {
          ...pagination,
          total,
        },
      },
    });
  } catch (error) {
    logger.error(`[getAllDanhMuc]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const getDanhMucById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[getDanhMucById]: id -> ${JSON.stringify(req.params)}`);

    const danhMuc = await danhMucService.getDanhMucById(id);
    if (!danhMuc) {
      logger.debug(`[getDanhMucById]: danhMuc -> ${httpResponses.KHONG_TIM_THAY_DANH_MUC}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_DANH_MUC}`,
      });
    }
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
      danhMuc,
    });
  } catch (error) {
    logger.error(`[getDanhMucById]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const updateDanhMuc = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    logger.info(`[updateDanhMuc]: id -> ${JSON.stringify(req.params)}. update -> ${JSON.stringify(req.body)}`);

    const danhMuc = await danhMucService.getDanhMucById(id);
    if (!danhMuc) {
      logger.debug(`[getDanhMucById]: danhMuc -> ${httpResponses.KHONG_TIM_THAY_DANH_MUC}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_DANH_MUC}`,
      });
    }

    await danhMucService.updateDanhMuc(id, update);
    logger.debug(`[updateDanhMuc]: updateDanhMuc -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[updateDanhMuc]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const deleteDanhMuc = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`[deleteDanhMuc]: id -> ${JSON.stringify(req.params)}.`);

    const danhMuc = await danhMucService.getDanhMucById(id);
    if (!danhMuc) {
      logger.debug(`[getDanhMucById]: danhMuc -> ${httpResponses.KHONG_TIM_THAY_DANH_MUC}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: `${httpResponses.KHONG_TIM_THAY_DANH_MUC}`,
      });
    }

    await danhMucService.deleteDanhMuc(id);
    logger.debug(`[deleteDanhMuc]: deleteDanhMuc -> ${httpResponses.SUCCESS}`);

    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESS}`,
    });
  } catch (error) {
    logger.error(`[deleteDanhMuc]: error -> ${error.message}`);
    return res.status(httpResponses.HTTP_STATUS_INTERNAL_ERROR).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  createDanhMuc,
  getAllDanhMuc,
  getDanhMucById,
  updateDanhMuc,
  deleteDanhMuc,
};
