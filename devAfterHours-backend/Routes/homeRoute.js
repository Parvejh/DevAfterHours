const express = require("express");
const router = express.Router();
const homeController = require("../Controllers/homeController");
const adminRoutes = require('../Routes/adminRoutes')

router.get("/",homeController.home);




router.use('/admin',adminRoutes);

module.exports = router;