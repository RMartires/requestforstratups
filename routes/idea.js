const express = require('express');

const router = express.Router();

const ideacontoler = require('../controllers/idea');

router.post('/addidea', ideacontoler.Postidea);

router.get('/', ideacontoler.getideas);

router.get('/idea/upvote/:ideaid', ideacontoler.putupvote);

module.exports = router;