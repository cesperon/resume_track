const router = require('express').Router();
const appController = require('../controller/appController.js');
const passportController = require('../controller/passportController.js');
const isLoggedIn = require('../helpers/isLoggedIn.js');
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const passport = require('passport');

router.get("/applications", appController.GetApplications);
router.post("/applications/search-company-name", appController.SearchByCompany);
router.post("/applications/search-by-stack", appController.SearchByStack);
router.post("/applications/add", appController.PostApplications);
router.post("/applications/delete", appController.DeleteApplication);
router.post("/applications/update", appController.UpdateApplication);
router.post("/applications/popular-stack", appController.PopularStack);
router.post("/applications/statistics", appController.ApplicationStatistics);

// passport
router.get("/failed", passportController.loginFail);
router.get("/success",isLoggedIn.isLoggedIn,  passportController.loginSuccess);

router.get("/register", passportController.registerUser);

router.get('/google', 
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
 ));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success');

    }
);

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});


module.exports = router;
