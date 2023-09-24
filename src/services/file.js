const PostGres = require('./PostGres');

const createHinhAnh = async (hinhAnh) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `INSERT INTO "hinhAnh" ( "uri", status, "idTinTuc", "idDiaDiem" ) VALUES ('${hinhAnh?.uri}', '${hinhAnh.status}', '${hinhAnh.idTinTuc}', '${hinhAnh.idDiaDiem}')`;
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

const getAllHinhAnh = async (search, pagination) => {
  const skip = pagination.page * pagination.limit - pagination.limit;
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM "hinhAnh" LIMIT ${pagination.limit} OFFSET ${skip} `;
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

const updateHinhAnh = async (id, update) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `UPDATE "hinhAnh" SET "uri"='${update?.tenHinhAnh}', status='${update?.status}', "idTinTuc"='${update?.idTinTuc}', "idDiaDiem"='${update?.idDiaDiem}' WHERE "idHinhAnh" = ${id}`;
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

const deleteHinhAnh = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `DELETE FROM "hinhAnh" WHERE "idHinhAnh" = ${id}`;
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
  createHinhAnh,
  getAllHinhAnh,
  updateHinhAnh,
  deleteHinhAnh,
};
