var Trip = require('../models/trip');

// GET /api/trips - list all trips
var tripsList = async function (req, res) {
  try {
    var trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips', error: err.message });
  }
};

// GET /api/trips/:tripId - single trip by MongoDB _id
var tripsReadOne = async function (req, res) {
  try {
    var trip = await Trip.findById(req.params.tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};

// GET /api/trips/:tripCode - single trip by code using Mongoose FIND
var tripsFindByCode = async function (req, res) {
  try {
    var trips = await Trip.find({ code: req.params.tripCode }).exec();
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};

// POST /api/trips - create a new trip
var tripsCreate = async function (req, res) {
  try {
    var trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      image: req.body.image,
      alt: req.body.alt,
      description: Array.isArray(req.body.description)
        ? req.body.description
        : [req.body.description]
    });
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', error: err.message });
  }
};

// PUT /api/trips/:tripCode - update an existing trip
var tripsUpdateOne = async function (req, res) {
  try {
    var trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        alt: req.body.alt,
        description: Array.isArray(req.body.description)
          ? req.body.description
          : [req.body.description]
      },
      { new: true, runValidators: true }
    ).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// DELETE /api/trips/:tripCode - remove a trip
var tripsDeleteOne = async function (req, res) {
  try {
    var trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(204).json(null);
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

module.exports = {
  tripsList: tripsList,
  tripsReadOne: tripsReadOne,
  tripsFindByCode: tripsFindByCode,
  tripsCreate: tripsCreate,
  tripsUpdateOne: tripsUpdateOne,
  tripsDeleteOne: tripsDeleteOne
};
