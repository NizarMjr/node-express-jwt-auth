const jwt = require('jsonwebtoken')
const { secret_jwt } = require('../config/config');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jwt is exist and is verified
    if (token) {
        jwt.verify(token, secret_jwt, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

//check current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret_jwt, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }