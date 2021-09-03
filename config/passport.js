const models = require('../models');
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    // models.Users.findById(id).then(function(user) {
    //     if (user) {
    //         done(null, user.get());
    //     } else {
    //         done(user.errors, null);
    //     }
    // });
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

passport.use('local-signup', new LocalStrategy(
 
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
    function(req, email, password, done) {

        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);     
        };

        models.Users.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
         
            if (user){
                return done(null, false, {
                    message: 'That email is already taken'
                });
            }else{
                var userPassword = generateHash(password);
                var currentDate = new Date();
                var data = {
                        username: req.body.username,
                        email: email,
                        password: userPassword,
                        first_name: req.body.firstname,
                        last_name: req.body.lastname,
                        last_login: currentDate,
                        role: 'user'
         
                    };
                models.Users.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        console.log("new_user", newUser)
                        return done(null, newUser);
                    }
         
                });
            }
        });
    }
 
));

//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(
 
    {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var User = req.user;
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
        models.Users.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
 
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));


