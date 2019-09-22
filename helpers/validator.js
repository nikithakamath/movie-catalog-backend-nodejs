'use strict';

const {check} = require('express-validator');

module.exports = {
  signupValidation: [check('email').isEmail(), check('username').not().isEmpty()],
  loginValidation: [check('email').isEmail()],
  updateBookmarkValidation: [check('movie_id').isInt().not().isEmpty(), check('action_type').isInt(),
                              check('mark').isBoolean(), check('bookmark_id').optional()],
  getBookmarkValidation: [check('action_type').not().isEmpty().isInt()],
  ratingValidation: [check('movie_id').not().isEmpty().isInt(), check('rating').not().isEmpty().isFloat()]
};
