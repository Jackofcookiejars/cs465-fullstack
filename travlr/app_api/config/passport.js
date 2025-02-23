const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = require("../models/user");
const User = require('../models/user');

passport.use(
    new LocalStrategy({
        usernameField: "email",
    },
    async (username, password, done) =>
    {
        const q = await User.findOne({ email: username}).exec();
        if(!q||!q.validPassword(password))
        {
            return done(null, false, {
                message: "Incorrect username or password", //Stop giving bad actors information.
            });
        }
        return done(null,q);
    }
));