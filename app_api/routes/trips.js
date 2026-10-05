var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsCreate);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateOne)
  .delete(tripsController.tripsDeleteOne);

module.exports = router;
