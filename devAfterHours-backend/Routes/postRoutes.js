const express = require('express')
const router = express.Router();
const postController = require('../Controllers/postController')
const authMiddleware = require('../Middlewares/authMiddleware')

// display Post page
router.get('/:slug',postController.post)

router.post(
    '/createPost',
    authMiddleware,
    postController.createPost
);

router.patch(
    '/:slug',
    authMiddleware,
    postController.updatePost
)

router.delete(
    '/:id',
    authMiddleware,
    postController.deletePost
);


module.exports = router