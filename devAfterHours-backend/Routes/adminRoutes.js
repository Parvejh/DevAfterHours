const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/',adminController.loginPage);

router.post('/createUser',adminController.createUser);

router.post('/login',adminController.login);


module.exports = router;