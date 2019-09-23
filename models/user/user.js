'use strict';

const connObj = require('../connection');
const connection = connObj.connection;
const USER_TABLE = connObj.user_table;
const USER_BOOKMARK_TABLE = connObj.user_bookmark_table;
const MOVIE_TABLE = connObj.movie_table;
const USER_RATING_TABLE = connObj.user_rating_table;

class UserModel {
  getUserWithEmail(email) {
    return new Promise((resolve, reject) => {
      let query = `select * from ${USER_TABLE} where email = '${email}'`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  createUser(userDetails) {
    return new Promise((resolve, reject) => {
      let query = `insert into ${USER_TABLE} set ?`;
      connection.query(query, userDetails, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
  getUserWithUid(uid) {
    return new Promise((resolve, reject) => {
      let query = `select * from ${USER_TABLE} where uid = '${uid}'`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  updateUserUid(userID, uid) {
    return new Promise((resolve, reject) => {
      let query = `update ${USER_TABLE} set uid = ? where user_id = ?`;
      let data = [uid, userID];
      connection.query(query, data, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(userID);
        }
      });
    });
  }
  getUserDetails(userID) {
    return new Promise((resolve, reject) => {
      let query = `select * from ${USER_TABLE} where user_id = ${userID}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  insertBookmark(data) {
    return new Promise((resolve, reject) => {
      let query = `insert into ${USER_BOOKMARK_TABLE} set ?`;
      connection.query(query, data, function (error, results) {
        if(error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results.length);
          resolve(results);
        }
      });
    });
  }
  deleteBookmark(bookmarkID) {
    return new Promise((resolve, reject) => {
      let query = `delete from ${USER_BOOKMARK_TABLE} where bookmark_id=${bookmarkID}`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results.length);
          resolve(results);
        }
      });
    });
  }
  getBookmark(userID, actionType) {
    return new Promise((resolve, reject) => {
      let query = `SELECT ${MOVIE_TABLE}.movie_id, ${MOVIE_TABLE}.title, ${MOVIE_TABLE}.overview,
      ${MOVIE_TABLE}.release_date, ${MOVIE_TABLE}.poster_path, ${USER_BOOKMARK_TABLE}.bookmark_id
      FROM ${MOVIE_TABLE} JOIN ${USER_BOOKMARK_TABLE}
      ON ${MOVIE_TABLE}.movie_id = ${USER_BOOKMARK_TABLE}.movie_id
      WHERE ${USER_BOOKMARK_TABLE}.user_id=${userID} AND
      ${USER_BOOKMARK_TABLE}.action_type=${actionType}
      ORDER BY ${USER_BOOKMARK_TABLE}.added_on desc`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results.length);
          resolve(results);
        }
      });
    });
  }
  addRating(userRating) {
    return new Promise((resolve, reject) => {
      let insertQuery = `insert into ${USER_RATING_TABLE} set ?`;
      let readQuery = `select vote_count from ${MOVIE_TABLE} where movie_id=?`
      let updateQuery = `update ${MOVIE_TABLE} set vote_count=? where movie_id=?`;
      connection.beginTransaction((err) => {
        if(err) reject(err);
        connection.query(insertQuery, userRating, (error, results) => {
          if(error) {
            return connection.rollback(() => {
              reject(error);
            });
          }
          connection.query(readQuery, userRating.movie_id, (error, results) => {
            if(error) {
              return connection.rollback(() => {
                reject(error);
              });
            }
            let newCount = results[0].vote_count + userRating.rating;
            connection.query(updateQuery, [newCount, userRating.movie_id], (error, results) => {
              if(error) {
                return connection.rollback(() => {
                  reject(error);
                });
              }
              connection.commit((error) => {
                if (error) {
                  return connection.rollback(() => {
                    reject(error);
                  });
                } else {
                  console.log('success!');
                  resolve();
                }
              });
            });
          })
        });
      });
    });
  }
  getMovieRating(userID) {
    return new Promise((resolve, reject) => {
      let query = `SELECT ${MOVIE_TABLE}.movie_id, ${MOVIE_TABLE}.title, ${MOVIE_TABLE}.overview,
      ${MOVIE_TABLE}.release_date, ${MOVIE_TABLE}.poster_path, ${USER_RATING_TABLE}.rating
      FROM ${MOVIE_TABLE} JOIN ${USER_RATING_TABLE}
      ON ${MOVIE_TABLE}.movie_id = ${USER_RATING_TABLE}.movie_id
      WHERE ${USER_RATING_TABLE}.user_id=${userID}
      ORDER BY ${USER_RATING_TABLE}.added_date desc`;
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

let userModelObj = new UserModel();

module.exports = userModelObj;
