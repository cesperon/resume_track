const router = require('express').Router();
//import controllers for application requests
const appController = require('../controller/appController.js');
//image upload
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
//home
router.get("/applications", appController.GetApplications);
router.post("/applications/search-company-name", appController.SearchByCompany);
router.post("/applications/search-by-stack", appController.SearchByStack);
router.post("/applications/add", appController.PostApplications);
router.post("/applications/delete", appController.DeleteApplication);
router.post("/applications/update", appController.UpdateApplication);
router.post("/applications/popular-stack", appController.PopularStack);
router.post("/applications/statistics", appController.ApplicationStatistics)

//export router
module.exports = router;
