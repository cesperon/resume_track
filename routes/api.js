const router = require('express').Router();
const appController = require('../controller/appController.js');
const authController = require('../controller/authController.js');
const isLoggedIn = require('../helpers/isLoggedIn.js');
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const passport = require('passport');

// authentication
router.get("/failed", authController.loginFail);
router.get("/success",isLoggedIn.isLoggedIn, authController.loginSuccess);

// router.get("/signup", passportController.registerUser);
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/success', failureRedirect: '/failed'}));
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] } ));
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/success', failureRedirect: '/failed'}));
router.get("/signup", authController.registerUser);
router.get("/sign-in", authController.signIn);
router.post('/signin', passport.authenticate('local-signin', {successRedirect: '/success',failureRedirect: '/failed'}));
router.get("/logout", authController.logout); 
router.get("/application/add", authController.addApp);
router.post("/login", authController.login);

//applications
router.get("/applications", appController.GetApplications);
router.post("/applications/search-company-name", appController.SearchByCompany);
router.post("/applications/search-by-stack", appController.SearchByStack);
router.post("/applications/add", appController.PostApplications);
router.post("/applications/delete", appController.DeleteApplication);
router.post("/applications/update", appController.UpdateApplication);
router.post("/applications/popular-stack", appController.PopularStack);
router.post("/applications/statistics", appController.ApplicationStatistics);

module.exports = router;
