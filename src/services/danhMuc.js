const PostGres = require('./PostGres');
const getdanhMucByName = async (tenDanhMuc) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM "danhMucDiaDiem" where "tenDanhMuc" = '${tenDanhMuc}'`;
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

const getDanhMucById = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM "danhMucDiaDiem" where "idDanhMucDiaDiem" = ${id}`;
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

const createDanhMuc = async (danhMuc) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `INSERT INTO "danhMucDiaDiem" ( "tenDanhMuc", "status", "parentId" ) VALUES ('${danhMuc?.tenDanhMuc}', ${danhMuc.status}, ${danhMuc.parentId})`;
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

const getAllDanhMuc = async (search, pagination) => {
  const skip = pagination.page * pagination.limit - pagination.limit;
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM "danhMucDiaDiem" WHERE "tenDanhMuc" ILIKE '%${search}%'  LIMIT ${pagination.limit} OFFSET ${skip} `;
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

const updateDanhMuc = async (id, update) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    // let query = `UPDATE "danhMucDiaDiem" SET "tenDanhMuc" ='${update?.tenDanhMuc}', "status"='${update?.status}', "parentId"='${update?.parentId}'  WHERE "idDanhMucDiaDiem" = ${id}`;
    let query = `UPDATE "danhMucDiaDiem" SET "tenDanhMuc" ='${update?.tenDanhMuc}' WHERE "idDanhMucDiaDiem" = ${id}`;
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

const deleteDanhMuc = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `DELETE FROM "danhMucDiaDiem" WHERE "idDanhMucDiaDiem" = ${id}`;
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
  getdanhMucByName,
  getDanhMucById,
  createDanhMuc,
  getAllDanhMuc,
  updateDanhMuc,
  deleteDanhMuc,
};
