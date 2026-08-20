const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController')

// POST   /api/categories
// GET    /api/categories
// PATCH  /api/categories/:id
// DELETE /api/categories/:id

router.get('/',categoryController.getCategories)
router.post('/',categoryController.createCategory)
// router.patch('/',categoryController.home)
// router.delete('/',categoryController.home)

module.exports = router;