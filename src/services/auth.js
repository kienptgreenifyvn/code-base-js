const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const keys = require('../constants/keys');
const constants = require('../constants/constants');

// Generate Token
const generateToken = (payload) => {
  const token = jwt.sign(payload, keys.SECRET_KEY, {
    expiresIn: constants.EXPIRES_IN,
  });
  return token;
};

// Verify Token
const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, keys.SECRET_KEY);
    return payload;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const generatePasswordStrong = (length) => {
  let password = '';
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  do {
    password = randomString.generate({
      length: length,
      charset: '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
  } while (regexPassword.test(password) === false);

  return password;
};

module.exports = {
  generateToken,
  verifyToken,
  generatePasswordStrong,
};
