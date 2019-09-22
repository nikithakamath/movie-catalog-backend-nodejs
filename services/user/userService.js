'use strict';

let userModel = require('../../models/user/user');

class UserService {
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
          requestData.joined_date = new Date();
          return userModel.createUser(requestData);
        })
        .then((userID) => {
          resolve(userID);
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
        .then((userID) => {
          resolve(userID);
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
            resolve(userData.user_id);
          } else {
            // First time login
            return this.handleFirstLogin(email, uid);
          }
        })
        .then((userID) => {
          resolve(userID);
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
          if(userDetails) {
            delete userDetails.uid;
            resolve(userDetails);
          } else {
            let err = new Error('User does not exist');
            reject(err);
          }
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
  rateMovie(userID, requestData) {
    return new Promise((resolve, reject) => {
      let userRating = {
        user_id: userID,
        movie_id: requestData.movie_id,
        rating: requestData.rating,
        added_date: new Date()
      };
      userModel.addRating(userRating)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getMovieRating(userID) {
    return new Promise((resolve, reject) => {
      userModel.getMovieRating(userID)
        .then((movieRating) => {
          resolve(movieRating);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

let userServiceObj = new UserService();

module.exports = userServiceObj;
