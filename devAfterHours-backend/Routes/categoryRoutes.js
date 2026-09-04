const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');
const authMiddleware = require('../Middlewares/authMiddleware');
const { requireRole } = require('../Utils/roleUtil');

// POST   /api/categories
// GET    /api/categories
// PATCH  /api/categories/:id
// DELETE /api/categories/:id

router.get('/',categoryController.getCategories)
// -- Creating a category now requires both a valid login and admin access.
router.post('/', authMiddleware, requireRole('admin'), categoryController.createCategory)
// router.patch('/',categoryController.home)
// router.delete('/',categoryController.home)

module.exports = router;
