const router = require('express').Router()
const { indexPage } = require('../controllers/index')

router.get('/', indexPage)

module.exports = router