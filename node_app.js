const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const authRoute = require('./routes/auth');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoute);

app.listen(5000);

