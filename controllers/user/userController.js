'use strict';

const express = require('express');
const router = express.Router();

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
  getUserDetails(request, response) {
    userService.getUserDetails(request.params.userID)
      .then((userDetails) => {
        response.status(200).json({
          success: true,
          data: userDetails
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  updateBookmark(request, response) {
    userService.updateBookmark(request.params.user_id, request.body)
      .then(() => {
        response.status(200).json({
          success: true,
          data: 'Bookmark updated successfully'
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: 'Bookmark update failed'
        });
      });
  }
  getBookmark(request, response) {
    userService.getBookmark(request.params.user_id, request.query)
        .then((bookmarkList) => {
          response.status(200).json({
            success: true,
            data: bookmarkList
          });
        })
        .catch((error) => {
          response.status(500).json({
            success: false,
            data: 'Get bookmark list failed'
          });
        });
  }
}

let userObj = new UserController();

router.get('/:user_id', userObj.getUserDetails);
router.post('/:user_id/bookmark/movie', userObj.updateBookmark);
router.get('/:user_id/bookmark/movie', userObj.getBookmark);

module.exports.userObj = userObj;
module.exports.router = router;
