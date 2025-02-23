const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async(req, res) => {
    //Validate completeness.
    if(!req.body.name||!req.body.email||!req.body.password){
        return res.status(400)
            .json({"message":"All fields required"});
    }
    
    const user = new User({
        name: req.body.name, //Set Username
        email: req.body.email, //Set user's email address
        password: '' //empty? I assume it's a leak thing.
    });
    user.setPassword(req.body.password) //Set user password
    const q = await user.save();

    if(!q)
    {
        //empty db.
        return res.status(400)
            .json(err);
    } else {
        //new cookie.
        const token = user.generateJWT();
        return res.status(200)
            .json(token);
    }
};

const login = (req, res) =>
{
    //validate.
    if(!req.body.email||!req.body.password)
    {
        return res.status(400)
            .json({"message":"All fields required"});
    }

    //Pass auth requirement to passport.
    passport.authenticate('local', (err,user,info) => {
        if(err){
            //Auth error.
            return res.status(404)
                .json(err);
        }
        if(user){
            const token = user.generateJWT();
            res.status(200)
                .json({token});
        }else{
            res.status(401)
                .json(info);
        }
    })(req,res);
};

module.exports={
    register,
    login
};