const express = require('express')
const router = express.Router();
const postController = require('../Controllers/postController')
const authMiddleware = require('../Middlewares/authMiddleware')

// get all public posts
router.get('/',postController.getPosts);

// get manage posts ( put before /:slug route to avoid this route getting confused with /:slug)
router.get('/manage',
    authMiddleware,
    postController.getManagePosts
);


// Edit the post for edit
router.get('/edit/:id',
    authMiddleware,
    postController.getPostForEdit
);

// Edit a post
router.patch('/edit/:id',
    authMiddleware,
    postController.editPost
);

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