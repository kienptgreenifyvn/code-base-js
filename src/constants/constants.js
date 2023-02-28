const dayjs = require('dayjs');

module.exports.SALT_ROUND = 10;
module.exports.EXPIRES_IN = 365 * 24 * 60 * 60;
module.exports.EXPIRES_IN_FORGOT_PASSWORD = 24 * 60 * 60;
module.exports.EXPIRES_IN_FORGOT_PASSWORD_BY_CODE = 24 * 60 * 60;

module.exports.DEFAULT_LIMIT = 10;
module.exports.DEFAULT_PAGE = 1;

// Auth
module.exports.PASSWORD_DEFAULT = '123456aA';
module.exports.PASSWORD_LENGTH = 10;
