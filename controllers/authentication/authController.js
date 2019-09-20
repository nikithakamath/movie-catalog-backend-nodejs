'use strict';

const express = require('express');
const router = express.Router();

let userObj = require('../user/userController');
let firebaseAuth = require('../../services/firebase/auth');

class AuthController {
  constructor() {
  }
  signUp(request, response) {
    userObj.signUp(request.body)
      .then(() => {
        response.status(200).json({
          success: true,
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
        });
      })
  }
  login(request, response) {
    firebaseAuth.verifyUserAuth(request.headers)
      .then((uid) => {
        return userObj.userLogin(request.body.email, uid);
      })
      .then(() => {
        response.status(200).json({
          success: true,
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
        });
      })
  }
}

let authObject = new AuthController();

router.post('/signUp', authObject.signUp);
router.post('/login', authObject.login);

module.exports.router = router;
