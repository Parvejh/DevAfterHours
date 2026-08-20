const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middlewares/authMiddleware')

// router.get('/',authController.loginPage); we will not need it as React will generate the UI

// Register
router.post('/register',authController.createUser);

// Login
router.post('/login',authController.login);

// Get current User
router.get('/me',
    authMiddleware,
    authController.getCurrentUser
)

module.exports = router;