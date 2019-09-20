'use strict';

let userService = require('../../services/user/userService');

class UserController {
  constructor() {

  }
  signUp(requestData) {
    return new Promise(function(resolve, reject) {
      userService.signUp(requestData)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  userLogin(email, uid) {
    return new Promise(function(resolve, reject) {
      userService.userLogin(email, uid)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

let userObj = new UserController();

module.exports = userObj;
