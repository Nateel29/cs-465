var express = require('express');
var router = express.Router();
var travelerController = require('../controllers/traveler');

router.get('/', travelerController.home);
router.get('/travel', travelerController.travel);

module.exports = router;