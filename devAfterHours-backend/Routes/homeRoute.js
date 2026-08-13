const express = require("express");
const router = express.Router();
const homeController = require("../Controllers/homeController");
const adminRoutes = require('../Routes/adminRoutes')


// TO display home page
router.get("/",homeController.home);

// To display post page
// router.get("/post/:slug",homeController.post)

// To user subscribe
// router.post('/subscribe',homeController.subscribe)

router.use('/admin',adminRoutes);

module.exports = router;