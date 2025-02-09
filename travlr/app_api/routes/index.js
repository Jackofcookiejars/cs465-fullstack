const express = require('express'); //Express import
const router = express.Router(); //Router import

//Controllers
const tripsController = require('../controllers/trips');

//define route
router.route("/trips")
    //.route('trips')
    .get(tripsController.tripsList);


router.route('/trips/:tripCode').get(tripsController.tripsFindByCode);

module.exports = router;