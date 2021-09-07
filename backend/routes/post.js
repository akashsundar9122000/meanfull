const express=require('express');
const checkAuth = require('../middleware/check-auth');
const router=express.Router();
const postController = require('../controllers/post');
const extractFile = require('../middleware/file');

router.post("",checkAuth,extractFile, postController.createPost)

router.put('/:id',checkAuth,extractFile, postController.updatePost)

router.get('', postController.getPosts)

router.get('/:id', postController.getPost)

router.delete('/:id',checkAuth, postController.deletePost)

module.exports = router;
