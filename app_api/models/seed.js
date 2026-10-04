// Seed the trips collection from trips.json
var fs = require('fs');
var path = require('path');
var db = require('./db');
var Trip = require('./trip');

async function seed() {
  await db.connect();
  var trips = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', '..', 'app_server', 'data', 'trips.json'), 'utf8')
  );
  var count = await Trip.countDocuments();
  if (count === 0) {
    await Trip.insertMany(trips);
    console.log('Seeded ' + trips.length + ' trips into the database');
  } else {
    console.log('Trips collection already contains ' + count + ' documents, skipping seed');
  }
  await db.mongoose.connection.close();
  console.log('Done');
  process.exit(0);
}

seed().catch(function (err) {
  console.error('Seed failed: ' + err);
  process.exit(1);
});
