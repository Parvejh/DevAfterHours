const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// router.get('/',authController.loginPage); we will not need it as React will generate the UI

// Register
router.post('/register',authController.createUser);

// Login
router.post('/login',authController.login);


module.exports = router;