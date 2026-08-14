const express = require('express')
const router = express.Router();
const postController = require('../Controllers/postController')
const authMiddleware = require('../Middlewares/authMiddleware')

// get all posts
router.get('/',postController.getPosts);

// display Post page
router.get('/:slug',postController.post)

// Create new post
router.post(
    '/createPost',
    authMiddleware,
    postController.createPost
);

// Update existing post
router.patch(
    '/:slug',
    authMiddleware,
    postController.updatePost
)

// Delete a post
router.delete(
    '/:id',
    authMiddleware,
    postController.deletePost
);


module.exports = router