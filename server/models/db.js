
const mysql = require("mysql2/promise");
const dbConfig = require("../configs/db.config");
//importing bluebird library helps to promisify the other modules
const bluebird=require("bluebird")

const conn= async ()=> {
  const connection = await mysql.createConnection({
    port: dbConfig.PORT,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    Promise: bluebird,
  });
  await connection.connect();
  return connection;
};
module.exports = conn;