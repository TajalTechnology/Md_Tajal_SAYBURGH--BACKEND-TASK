const router = require('express').Router()
const { userValidator } = require('../validation/users')
const { createUser, logIn } = require('../controllers/users')

router.post('/sign-up', userValidator, createUser)
router.post('/sign-in', userValidator, logIn)

module.exports = router