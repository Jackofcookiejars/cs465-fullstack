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

module.exports = {
    tripsList,
    tripsFindByCode
};