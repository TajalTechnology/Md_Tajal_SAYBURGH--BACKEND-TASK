const router = require('express').Router()
const { authVerify } = require('../middleware/authVerify')
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts')

router.get('/post', getPosts)
router.post('/post', authVerify, createPost)
router.patch('/post/:_id', authVerify, updatePost)
router.patch('/post/:_id', likePost)
router.delete('/post/:_id', authVerify, deletePost)

module.exports = router