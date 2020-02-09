const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const authRoute = require('./routes/auth');
const ideaRoute = require('./routes/idea');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoute);
app.use(ideaRoute);
//port 5000
app.listen(5000);

