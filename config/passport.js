const models = require('../models');
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");


passport.serializeUser(function(user, done) {
    done(null, user);
    //done(null, user.id)
});
passport.deserializeUser(function(user, done) {
    // models.Users.findById(id).then(function(user) {
    //     if (user) {
    //         done(null, user.get());
    //     } else {
    //         done(user.errors, null);
    //     }
    // });
    // let user = users.find((user) => {
    //     return user.id === id
    //   })

    // done(null, user)
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            // return done(null, profile);
        models.Users.findOne({
            where: {
                email: profile.email
            }
        }).then(function(user) {
            if (!user) {
                var currentDate = new Date();
                var data = {
                        username: profile.displayName,
                        email: profile.email,
                        first_name: profile.given_name,
                        last_name: profile.family_name,
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
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        last_login: currentDate,
                        role: 'user'
                    };
                    console.log('signup-data', data);
                models.Users.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        console.log("new_user", newUser.get());
                        const token = jwt.sign(newUser.get(), 'My_Secret');

                        return done(null, {newUser, token});

                    }
         
                });
            }
        });
    }
 
));

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
            const token = jwt.sign(userinfo, 'My_Secret')
            return done(null, {userinfo, token});
 
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));


