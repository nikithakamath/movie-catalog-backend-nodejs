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
          return userModel.createUser(requestData);
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
            return userModel.updateUserUid(userData.user_id, uid);
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
  getUserDetails(userID) {
    return new Promise((resolve, reject) => {
      userModel.getUserDetails(userID)
        .then((userDetails) => {
          delete userDetails.uid;
          resolve(userDetails);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateBookmark(userID, requestData) {
      if(requestData.mark) {
        // Mark movie as liked
        let data = {
          user_id: userID,
          movie_id: requestData.movie_id,
          action_type: requestData.action_type,
          added_on: new Date()
        };
        return userModel.insertBookmark(data);
      } else {
        // Unmark movie as liked
        return userModel.deleteBookmark(requestData.bookmark_id);
      }
  }
  getBookmark(userID, requestData) {
    return new Promise((resolve, reject) => {
      userModel.getBookmark(userID, requestData.action_type)
          .then((bookmarkList) => {
            resolve(bookmarkList);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
}

let userServiceObj = new UserService();

module.exports = userServiceObj;
