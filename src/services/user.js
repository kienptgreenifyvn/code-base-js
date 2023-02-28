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
    let query = `SELECT * FROM users where email = '${email}'`;
    let result = await db.query(query);
    // console.log(result)
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
    let query = `INSERT INTO users VALUES ('${newUser.email}', '${password}', '${newUser.role}' )`;
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

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
};
