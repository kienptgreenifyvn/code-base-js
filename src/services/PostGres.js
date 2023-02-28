var pg = require('pg');
const constants = require('../constants');
let instance = null;
var dbConnected = null;
var pool = new pg.Pool(constants.postgres.config);
class PostGres {
  constructor() {
    if (!instance) {
      instance = this;
      return instance;
    }
    return instance;
  }
  onConnect() {
    return new Promise((resolve, reject) => {
      if (!dbConnected) {
        pool.connect((err, client, done) => {
          if (!err) {
            dbConnected = client;
            console.error('connect success');
            client.on('close', () => {
              console.error('connection to mongoDB has closed, trying to connect on next session ...');
              dbConnected = null;
            });
            resolve(dbConnected);
          } else {
            console.error('error connected');
            resolve(null);
          }
        });
      } else {
        resolve(dbConnected);
      }
    });
  }
}

module.exports = new PostGres();
