const express = require('express'); //Express import
const router = express.Router(); //Router import
const jwt = require('jsonwebtoken'); //Enable json cookies.

//Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

//define routes
router.route("/trips")
    .get(tripsController.tripsList) //GET method, routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip) //POST method, enables adding trips.


router.route('/trips/:tripCode').get(tripsController.tripsFindByCode) //GET a single trip.
    .put(authenticateJWT, tripsController.tripsUpdateTrip); //PUT method, enables updating a single trip.

//Auth function
function authenticateJWT(req,req,next){
    //console.log('In JWT auth');

    const authHeader = req.headers['authorization'];
    //console.log('Auth Header: ' + authHeader);

    if(authHeader==null)
    {
        console.log('AuthHead missing!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1){
        console.log('Not enough tokens in AuthHead: '+headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    //console.log('Token: ' + token);
    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err){
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; //set the auth param to decoded obj.
    });
    next();
}

module.exports = router;