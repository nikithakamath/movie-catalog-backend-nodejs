'use strict';

const connObj = require('../connection');
const connection = connObj.connection;
const MOVIE_TABLE = connObj.movie_table;
const GENRE_TABLE = connObj.genre_table;
const MOVIE_GENRE_TABLE = connObj.movie_genre_table;
const KEYWORD_TABLE = connObj.keyword_table;
const MOVIE_KEYWORD_TABLE = connObj.movie_keyword_table;
const MOVIE_STATUS_TABLE = connObj.movie_status_table;

class MovieModel {
  constructor() {

  }
  getMovies() {
    return new Promise((resolve, reject) => {
      let query = `select * from ${MOVIE_TABLE}
      order by release_date desc`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  getMovieDetails(movieID) {
    return new Promise((resolve, reject) => {
      let query = `select *, DATE_FORMAT(release_date,'%d/%m/%Y') as release_date from ${MOVIE_TABLE} where movie_id = ${movieID}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  listGenres() {
    return new Promise((resolve, reject) => {
      let query = `select * from ${GENRE_TABLE}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  getMovieGenres(movieID) {
    return new Promise((resolve, reject) => {
      let query = `select genre_id, name from ${MOVIE_GENRE_TABLE} where movie_id = ${movieID}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  discoverByGenre(genreID) {
    return new Promise((resolve, reject) => {
      let query = `SELECT *
      FROM ${MOVIE_TABLE} JOIN ${MOVIE_GENRE_TABLE}
      ON ${MOVIE_TABLE}.movie_id = ${MOVIE_GENRE_TABLE}.movie_id
      WHERE ${MOVIE_GENRE_TABLE}.genre_id=${genreID}
      ORDER BY vote_count desc`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  listKeywords() {
    return new Promise((resolve, reject) => {
      let query = `select * from ${KEYWORD_TABLE}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  discoverByKeyword(keywordID) {
    return new Promise((resolve, reject) => {
      let query = `SELECT *
      FROM ${MOVIE_TABLE} JOIN ${MOVIE_KEYWORD_TABLE}
      ON ${MOVIE_TABLE}.movie_id = ${MOVIE_KEYWORD_TABLE}.movie_id
      WHERE ${MOVIE_KEYWORD_TABLE}.keyword_id=${keywordID}
      ORDER BY vote_count desc`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  getMovieStatus() {
    return new Promise((resolve, reject) => {
      let query = `select * from ${MOVIE_STATUS_TABLE}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  getMovieKeywords(movieID) {
    return new Promise((resolve, reject) => {
      let query = `select keyword_id, name from ${MOVIE_KEYWORD_TABLE} where movie_id = ${movieID}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  addMovie(movieData) {
    return new Promise((resolve, reject) => {
      let query = `insert into ${MOVIE_TABLE} set ?`;
      connection.query(query, movieData, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
}

let movieModelObj = new MovieModel();

module.exports = movieModelObj;
