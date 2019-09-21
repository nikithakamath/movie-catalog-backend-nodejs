'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('../controllers/authentication/authController').router);
router.use('/user', require('../controllers/user/userController').router);
router.use('/movie', require('../controllers/movie/movieController').router);

module.exports = router;
