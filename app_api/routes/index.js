var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');
var authController = require('../controllers/authentication');
var authenticateJWT = require('../middleware/authenticate');

// Authentication endpoints (public)
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

// Trip endpoints: GET is public, POST/PUT/DELETE require authentication
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsCreate);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateOne)
  .delete(authenticateJWT, tripsController.tripsDeleteOne);

module.exports = router;
