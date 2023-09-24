const PostGres = require('./PostGres');
const security = require('./security');
const getUserByEmail = async (email) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM users where email = '${email}' or "userName"='${email}'`;
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

const getUserById = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT * FROM users where id = ${id}`;
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

const createUser = async (newUser) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    const password = security.hashPassword(newUser?.password);
    let query = `INSERT INTO users ("userName", password, email, role, sdt, "firstName", "lastName", status, "address" ) VALUES ('${newUser?.userName}', '${password}', '${newUser.email}', '${newUser.role}','${newUser.sdt}', '${newUser.firstName}', '${newUser.lastName}', ${newUser.status}, '${newUser.address}' )`;
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

const getAllUser = async (search, pagination) => {
  const skip = pagination.page * pagination.limit - pagination.limit;
  console.log(search);
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `SELECT email, "userName", sdt, "firstName", "lastName", address, role FROM users WHERE CONCAT("firstName", ' ', "lastName") ILIKE '%${search}%'  LIMIT ${pagination.limit} OFFSET ${skip} `;
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

const updateUser = async (id, update) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    // const password = security.hashPassword(update?.password);
    let query = `UPDATE users SET sdt='${update?.sdt}', "firstName"='${update?.firstName}', "lastName"='${update?.lastName}', status='${update.status}', address='${update.address}' WHERE id = ${id}`;
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

const deleteUser = async (id) => {
  let db = await PostGres.onConnect();
  if (!db)
    return {
      isSuccess: false,
      status: 404,
      message: 'Resource not found !',
    };
  else {
    let query = `DELETE FROM users WHERE id = ${id}`;
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
  getUserByEmail,
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
};
