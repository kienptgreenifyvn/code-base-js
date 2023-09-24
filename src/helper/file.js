const Multer = require('multer');
const fileBaseUrl = process.env.FILE_BASE_URL;
const storageUrl = process.env.STORAGE_URL;
const { FILE_MAX_SIZE } = require('../constants/constants');

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageUrl);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const getImgUrls = (files) => {
  const imgUrls = files.map((file) => {
    return `${fileBaseUrl}/${file.filename}`;
  });

  return imgUrls;
};

const getImgUrlsName = (files) => {
  const imgUrls = files.map((file) => {
    return `${file.filename}`;
  });
  return imgUrls;
};
const getImgUrl = (file) => {
  return `${fileBaseUrl}/${file.filename}`;
};

const getImgUrlName = (file) => {
  return `${file.filename}`;
};

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multer = Multer({
  storage: storage,
  limits: { fileSize: FILE_MAX_SIZE },
  fileFilter: fileFilter,
});

module.exports = {
  multer,
  getImgUrls,
  getImgUrl,
  getImgUrlsName,
  getImgUrlName,
};
