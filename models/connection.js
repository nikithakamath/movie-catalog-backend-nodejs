'use strict';

const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

connection.connect((err) => {
  if(err) {
    console.log(`Error while connecting to MySQL: ${err}`);
  } else {
    console.log(`Connection to MySQL is successful`);
  }
});

module.exports = connection;
