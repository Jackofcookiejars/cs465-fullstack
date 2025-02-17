const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model.find({}).exec();
    //No filter, return all records
    //Next line shows queries on console.
    console.log(q);

    if(!q)
    {
        //database empty
        return res.status(404).json(err);
    } else {
        //return trip list
        return res.status(200).json(q);
    }
};

const tripsFindByCode = async (req, res) => {
    const q = await Model.find({'code':req.params.tripCode}).exec();

    //following code prints queries to console.
    console.log(q);
};

//POST: /trips - Adds trip to DB

const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    //Next line logs results.
    console.log(q);
    if(!q)
    {
        //Database returns no data
        return res.status(400).json(err);
    }
    else
    {   
        //Return new trip
        return res.status(201).json(q);
    }
};

//PUT: /trips/:tripCode -New Trip.
const tripsUpdateTrip = async(req, res) => {
    const q = await Model.findOneAndUpdate({'code':req.params.tripCode},
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
    }).exec();
    if(!q)
    {
        return res.status(400).json(err);
    }
    else
    {
        return res.status(201).json(q);
    }
}


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};