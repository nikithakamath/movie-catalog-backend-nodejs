'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(require('./routes'));


app.listen(port, () => console.log(`App is listening on port ${port}`));
