const express = require("express");
const router = express.Router();
const homeController = require("../Controllers/homeController");
const authRoutes = require('../Routes/authRoutes')
const postRoutes = require('../Routes/postRoutes')


// TO display home page
router.get("/",homeController.home);

// To display post page
// router.get("/post/:slug",homeController.post)

// To user subscribe
// router.post('/subscribe',homeController.subscribe)

router.use('/admin',adminRoutes);
router.use('/post',postRoutes);

module.exports = router;