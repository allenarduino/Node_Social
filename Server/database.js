const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "code_reservoir",
  charset: "utf8mb4",
  multipleStatements: true
});

conn.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Database Connected");
});

module.exports = conn;
