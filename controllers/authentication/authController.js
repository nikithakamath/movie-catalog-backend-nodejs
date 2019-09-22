'use strict';

const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

let validator = require('../../helpers/validator');
let userObj = require('../user/userController').userObj;
let firebaseAuth = require('../../services/firebase/auth');

class AuthController {
  constructor() {
  }
  signUp(request, response) {
    let validationErr = validationResult(request);
    if (!validationErr.isEmpty()) {
      console.log(validationErr);
      response.status(400).json({
        success: false,
        data: 'Invalid parameters'
      });
    } else {
      userObj.signUp(request.body)
        .then((userID) => {
          let token = jwt.sign({
            user_id: userID,
            iat: Math.floor(Date.now() / 1000)
          }, process.env.JWT_SECRET);
          let result = {
            user_id: userID,
            accessToken: token
          };
          response.status(201).json({
            success: true,
            data: result
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(400).json({
            success: false,
            data: 'User signup failed'
          });
        });
    }
  }
  login(request, response) {
    let validationErr = validationResult(request);
    if (!validationErr.isEmpty()) {
      console.log(validationErr);
      response.status(400).json({
        success: false,
        data: 'Invalid parameters'
      });
    } else {
      firebaseAuth.verifyUserAuth(request.headers)
        .then((uid) => {
            return userObj.userLogin(request.body.email, uid);
        })
        .then((userID) => {
          // No expiry kept for the token
          let token = jwt.sign({
            user_id: userID,
            iat: Math.floor(Date.now() / 1000)
          }, process.env.JWT_SECRET);
          let result = {
            user_id: userID,
            accessToken: token
          };
          response.status(200).json({
            success: true,
            data: result
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(403).json({
            success: false,
            data: 'Login failed'
          });
        });
    }
  }
}

let authObject = new AuthController();

router.post('/signUp', validator.signupValidation, authObject.signUp);
router.post('/login', validator.loginValidation, authObject.login);

module.exports.router = router;
