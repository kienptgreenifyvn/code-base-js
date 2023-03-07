const PostGres = require('./PostGres');
const getQuanHuyenByName = async (tenQuanHuyen) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM quanhuyen where tenquanhuyen = '${tenQuanHuyen}'`;
    let result = await db.query(query);
    if (result) {
      return result.rows[0];
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

const getQuanHuyenById = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM quanhuyen where idquanhuyen = ${id}`;
    let result = await db.query(query);
    if (result) {
      return result.rows[0];
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

const createQuanHuyen = async (quanHuyen) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `INSERT INTO quanhuyen ( tenquanhuyen, status ) VALUES ('${quanHuyen?.tenQuanHuyen}', '${quanHuyen.status}')`;
    let result = await db.query(query);
    if (result) {
      return result;
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

const getAllQuanHuyen = async (search, pagination) => {
  const skip = pagination.page * pagination.limit - pagination.limit;
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM quanhuyen WHERE tenquanhuyen ILIKE '%${search}%'  LIMIT ${pagination.limit} OFFSET ${skip} `;
    let result = await db.query(query);
    if (result) {
      return result.rows;
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

const updateQuanHuyen = async (id, update) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `UPDATE quanhuyen SET tenquanhuyen='${update?.tenQuanHuyen}', status='${update?.status}' WHERE idquanhuyen = ${id}`;
    let result = await db.query(query);
    if (result) {
      return result;
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

const deleteQuanHuyen = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `DELETE FROM quanhuyen WHERE idquanhuyen = ${id}`;
    let result = await db.query(query);
    if (result) {
      return result;
    } else
      return {
        isSuccess: false,
        status: 404,
        message: 'Resource not found !',
      };
  }
};

module.exports = {
  getQuanHuyenByName,
  getQuanHuyenById,
  createQuanHuyen,
  getAllQuanHuyen,
  updateQuanHuyen,
  deleteQuanHuyen,
};
