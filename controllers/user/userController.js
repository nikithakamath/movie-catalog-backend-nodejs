'use strict';

const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');

let validator = require('../../helpers/validator');
let middleware = require('../../middleware/middleware');
let userService = require('../../services/user/userService');

class UserController {
  signUp(requestData, uid) {
    return new Promise(function(resolve, reject) {
      userService.signUp(requestData, uid)
        .then((userID) => {
          resolve(userID);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  userLogin(email, uid) {
    return new Promise(function(resolve, reject) {
      userService.userLogin(email, uid)
        .then((userID) => {
          resolve(userID);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getUserDetails(request, response) {
    userService.getUserDetails(request.params.user_id)
      .then((userDetails) => {
        response.status(200).json({
          success: true,
          data: userDetails
        });
      })
      .catch((error) => {
        response.status(404).json({
          success: false,
          data: 'User does not exist'
        });
      });
  }
  updateBookmark(request, response) {
    let validationErr = validationResult(request);
    if (!validationErr.isEmpty()) {
      console.log(validationErr);
      response.status(400).json({
        success: false,
        data: 'Invalid parameters'
      });
    } else {
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
  }
  getBookmark(request, response) {
    let validationErr = validationResult(request);
    if (!validationErr.isEmpty()) {
      console.log(validationErr);
      response.status(400).json({
        success: false,
        data: 'Invalid parameters'
      });
    } else {
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
  rateMovie(request, response) {
    let validationErr = validationResult(request);
    if (!validationErr.isEmpty()) {
      console.log(validationErr);
      response.status(400).json({
        success: false,
        data: 'Invalid parameters'
      });
    } else {
      userService.rateMovie(request.params.user_id, request.body)
        .then(() => {
          response.status(201).json({
            success: true,
            data: 'Movie rated successfully'
          });
        })
        .catch((error) => {
          if(error.errno === 1062) {
            // Duplicate rating entry into the db
            response.status(409).json({
              success: false,
              data: 'Movie rating already given'
            });
          } else {
            response.status(500).json({
              success: false,
              data: 'Movie rating failed'
            });
          }
        });
    }
  }
  getMovieRating(request, response) {
    userService.getMovieRating(request.params.user_id)
      .then((movieRating) => {
        response.status(200).json({
          success: true,
          data: movieRating
        });
      })
      .catch((error) => {
        response.status(404).json({
          success: false,
          data: 'User movie rating not found'
        });
      });
  }
}

let userObj = new UserController();

router.get('/:user_id', middleware.authorizeUser, userObj.getUserDetails);
router.post('/:user_id/bookmark/movie', validator.updateBookmarkValidation,
  middleware.authorizeUser, userObj.updateBookmark);
router.get('/:user_id/bookmark/movie', validator.getBookmarkValidation,
  middleware.authorizeUser, userObj.getBookmark);
router.post('/:user_id/rating/movie', validator.ratingValidation,
  middleware.authorizeUser, userObj.rateMovie);
router.get('/:user_id/rating/movie', middleware.authorizeUser, userObj.getMovieRating);

module.exports.userObj = userObj;
module.exports.router = router;
