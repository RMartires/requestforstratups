const express = require('express');

const router = express.Router();

const authControler = require('../controllers/auth');

router.get('/signup', authControler.postSignup);

module.exports = router;