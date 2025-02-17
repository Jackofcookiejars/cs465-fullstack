const express = require('express'); //Express import
const router = express.Router(); //Router import

//Controllers
const tripsController = require('../controllers/trips');

//define route
router.route("/trips")
    .get(tripsController.tripsList) //GET method, routes tripList
    .post(tripsController.tripsAddTrip) //POST method, enables adding trips.
    .put(tripsController.tripsUpdateTrip); //PUT method, enables updating a single trip.


router.route('/trips/:tripCode').get(tripsController.tripsFindByCode);

module.exports = router;