const express = require('express')
const router = express.Router();
const postController = require('../Controllers/postController')

// display Post page
router.get('/:slug',postController.post)

router.post('/createPost',postController.createPost);

router.patch('/:slug',postController.updatePost)

router.delete('/:id',postController.deletePost);


module.exports = router