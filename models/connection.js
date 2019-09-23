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

connection.on('disconnect', (err) => {
  if(err) {
    console.log(`Error while disconnecting from MySQL: ${err}`);
  } else {
    console.log(`Disconnected from MySQL`);
  }
});

module.exports = {
  connection: connection,
  movie_table: 'movie',
  genre_table: 'genre',
  movie_genre_table: 'movie_genre',
  keyword_table: 'keyword',
  movie_keyword_table: 'movie_keyword',
  user_table: 'user',
  user_bookmark_table: 'user_bookmark',
  movie_status_table: 'movie_status',
  user_rating_table: 'user_rating'
};
