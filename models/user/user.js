'use strict';

const connection = require('../connection');
const USER_TABLE = 'user1';

class UserModel {
  constructor() {

  }
  getUserWithEmail(email) {
    return new Promise((resolve, reject) => {
      let query = `select * from ${USER_TABLE} where email = '${email}'`;
      console.log(query);
      connection.query(query, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results[0]);
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
          // console.log(results.length);
          resolve(results);
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
          console.log(results[0]);
          resolve(results[0]);
        }
      });
    });
  }
  updateUserUid(userID, uid) {
    return new Promise((resolve, reject) => {
      let query = `update ${USER_TABLE} set uid = ? where userID = ?`;
      let data = [uid, userID];
      connection.query(query, data, function (error, results) {
        if(error) {
          reject(error);
        } else {
          console.log(results.affectedRows);
          resolve();
        }
      });
    });
  }
}

let userModelObj = new UserModel();

module.exports = userModelObj;
