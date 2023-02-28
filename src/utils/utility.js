const checkEnum = (type, enums) => {
  return Object.values(enums).includes(type);
};

module.exports = {
  checkEnum,
};
