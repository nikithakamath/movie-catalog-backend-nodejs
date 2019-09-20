'use strict';

let userModel = require('../../models/user/user');

class UserService {
  constructor() {

  }
  checkUserExists(email) {
    return new Promise((resolve, reject) => {
      userModel.getUserWithEmail(email)
        .then((userData) => {
          if(userData) {
            let err = new Error('User already exists');
            reject(err);
          } else {
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  signUp(requestData) {
    return new Promise((resolve, reject) => {
      this.checkUserExists(requestData.email)
        .then(() => {
          let userDetails = {
            userID: 'u_' + new Date().getTime().toString(),
            userName: request.body.userName,
            email: request.body.email,
          };
          return userModel.createUser(userDetails);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  handleFirstLogin(email, uid) {
    return new Promise(function(resolve, reject) {
      // Check whether email exists
      userModel.getUserWithEmail(email)
        .then((userData) => {
          if(userData) {
            // User exists, update uid
            return userModel.updateUserUid(userData.userID, uid);
          } else {
            // User does not exist, deny
            let err = new Error('User login failed because user does not exist');
            reject(err);
          }
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  userLogin(email, uid) {
    return new Promise((resolve, reject) => {
      userModel.getUserWithUid(uid)
        .then((userData) => {
          if(userData) {
            // User has logged in before
            resolve(userData);
          } else {
            // First time login
            return this.handleFirstLogin(email, uid);
          }
        })
          .then(() => {
            resolve();
          })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

let userServiceObj = new UserService();

module.exports = userServiceObj;
