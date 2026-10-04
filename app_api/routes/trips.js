var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsCreate);

router
  .route('/trips/:tripId')
  .get(tripsController.tripsReadOne)
  .put(tripsController.tripsUpdateOne)
  .delete(tripsController.tripsDeleteOne);

module.exports = router;
