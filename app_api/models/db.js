var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var { MongoMemoryServer } = require('mongodb-memory-server');

var dbURI = 'mongodb://127.0.0.1:27017/travlr';
var memoryServer = null;

async function connect() {
  try {
    // Try local MongoDB first
    await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 3000 });
    console.log('Mongoose connected to local MongoDB at ' + dbURI);
  } catch (err) {
    // Fall back to in-memory MongoDB when no local server is available
    console.log('Local MongoDB unavailable, starting in-memory MongoDB...');
    memoryServer = await MongoMemoryServer.create();
    var uri = memoryServer.getUri('travlr');
    await mongoose.connect(uri);
    console.log('Mongoose connected to in-memory MongoDB');
  }

  // Seed trips collection if empty
  var Trip = require('./trip');
  var count = await Trip.countDocuments();
  if (count === 0) {
    var trips = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '..', 'app_server', 'data', 'trips.json'), 'utf8')
    );
    await Trip.insertMany(trips);
    console.log('Seeded ' + trips.length + ' trips into the database');
  } else {
    console.log('Trips collection has ' + count + ' documents');
  }
}

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

module.exports = { connect: connect, mongoose: mongoose };
