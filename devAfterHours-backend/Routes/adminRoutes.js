const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/',adminController.login)

module.exports = router;