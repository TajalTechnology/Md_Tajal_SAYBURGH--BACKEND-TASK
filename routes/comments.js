const router = require('express').Router()
const { authVerify } = require('../middleware/authVerify')
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/comments.js')

router.get('/comment', getComments)
router.post('/comment', authVerify, createComment)
router.patch('/comment/:_id', authVerify, updateComment)
router.delete('/comment/:_id', authVerify, deleteComment)

module.exports = router