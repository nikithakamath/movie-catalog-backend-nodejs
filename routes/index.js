'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('../controllers/authentication/authController').router);

module.exports = router;
