//#region HTTP status
// Success code
module.exports.HTTP_STATUS_CREATED = 201;
module.exports.HTTP_STATUS_OK = 200;

// Error code
module.exports.HTTP_STATUS_BAD_REQUEST = 400;
module.exports.HTTP_STATUS_UNAUTHORIZED = 401;
module.exports.HTTP_STATUS_NOT_ALLOWED = 403;
module.exports.HTTP_STATUS_NOT_FOUND = 404;
module.exports.HTTP_STATUS_UNSUPPORTED_REQUEST = 419;
module.exports.HTTP_STATUS_INTERNAL_ERROR = 500;
module.exports.HTTP_STATUS_CONFLICT = 409;
//#endregion HTTP status

//#region General message
module.exports.SUCCESS = 'Success';
module.exports.FAIL = 'Fail';
module.exports.INVALID_REQUEST = 'Invalid request';
module.exports.CODE_INVALID = 'Code invalid';
module.exports.ENUM_INVALID = 'Enum invalid';
module.exports.GENDER_INVALID = 'Gender invalid';
//#endregion General

//#region Access
module.exports.CAN_GET_ACCESS = 'Can get access';
module.exports.PERMISSION_DENIED = 'Permission denied';
module.exports.UNAUTHORIZED = 'Unauthorized';
module.exports.CAN_GET_ACCESS_WITH_TOKEN = 'Can get access with token';
//#endregion Access

//#region Auth
module.exports.EMAIL_REQUIRED = 'Email is required';
module.exports.PASSWORD_REQUIRED = 'Password is required';
module.exports.PASSWORD_NOT_FOUND = 'Password not found';
module.exports.EMAIL_EXISTED = 'Email is existed';
module.exports.REGISTER_SUCCESS = 'Register success';
module.exports.REGISTER_FAIL = 'Register fail';
module.exports.LOGIN_SUCCESS = 'Login success';
module.exports.REDIRECT_URL_INVALID = 'Redirect url invalid';
module.exports.EMAIL_INVALID = 'Email invalid';
module.exports.CODE_NOT_FOUND = 'Code not found';
module.exports.TOKEN_REQUIRED = 'Token is required';
module.exports.TOKEN_EXPIRED = 'Token expired';
//#endregion Auth

//#region User
module.exports.PASSWORD_INCORRECT = 'Incorrect password';
module.exports.USER_NOT_FOUND = 'User not found';
module.exports.EMAIL_HAS_USER = 'Email has user';
module.exports.PASSWORD_INVALID = 'Password invalid';
module.exports.EMAIL_NOT_FOUND = 'Email not found';
module.exports.TOKEN_NOT_FOUND = 'Token not found';
module.exports.TOKEN_GOOGLE_ID_NOT_FOUND = 'TokenId google not found';
module.exports.TOKEN_GOOGLE_ID_VERIFY_ERROR = 'TokenId google verify error';
module.exports.ACCESS_TOKEN_FACEBOOK_NOT_FOUND = 'Access token facebook not found';
module.exports.ACCESS_TOKEN_FACEBOOK_VERIFY_ERROR = 'Access token facebook verify error';
module.exports.GOOGLE_ID_NOT_FOUND = 'Id google not found';
module.exports.USER_DELETED_SUCCESSFULLY = 'User deleted successfully';
//#endregion User

// Message when response is error
module.exports.USERNAME_ALREADY_EXISTS = 'Username already exists';
module.exports.EMAIL_ALREADY_EXISTS = 'Email already exists';
module.exports.PHONE_ALREADY_EXISTS = 'Phone already exists';
module.exports.ERROR_PASSWORD_INCORRECT = 'Password incorrect';

// Admin
module.exports.ADMIN_CREATED_SUCCESSFULLY = 'Admin created successfully';
module.exports.ADMIN_NOT_FOUND = 'Admin not found';

// File
module.exports.UPLOAD_FILE_SUCCESSFULLY = 'Upload file successfully';
module.exports.DELETE_FILE_SUCCESSFULLY = 'Delete file successfully';
module.exports.UNABLE_READ_LIST_FILES = 'Unable to read list of files!';
module.exports.UPLOAD_AVATAR_SUCCESSFULLY = 'Upload avatar successfully';
module.exports.FILE_TOO_LARGE = 'File size cannot be larger than 5MB!';
module.exports.DELETE_AVATAR_FAIL = 'Delete avatar fail.';
module.exports.DELETE_AVATAR_SUCCESSFULLY = 'Delete avatar successfully.';
module.exports.COULD_NOT_UPLOAD_FILE = 'Could not upload the file: ';
module.exports.FILE_IS_REQUIRED = 'File is required';
module.exports.FILES_IS_REQUIRED = 'Files is required';
