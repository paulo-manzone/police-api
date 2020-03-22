const mysql    = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectado ao Servidor do banco de dados Mysql!");
});

module.exports = connection;