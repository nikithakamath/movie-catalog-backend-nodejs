'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Content-Type,X-Requested-With,Authorization');
    if ( req.method === 'OPTIONS' ) {
        res.status(200).end();
    } else {
        next();
    }
};

app.use(bodyParser.json());
// allow cross domain access
app.use(allowCrossDomain);

app.use(require('./routes'));

if(process.env.NODE_ENV === 'development') {
  app.listen(port, () => console.log(`App is listening on port ${port}`));
}

module.exports = app;
