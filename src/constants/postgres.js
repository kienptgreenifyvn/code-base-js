var config = {
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.POST,
  max: process.env.MAX,
  idleTimeoutMillis: process.env.IDLETIMEOUTMILLS,
};

module.exports = { config };
