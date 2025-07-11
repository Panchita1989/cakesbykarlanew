const express = require('express')
const router = express.Router()
const cakeController = require('../controller/cake')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/', cakeController.getCake)
router.post('/add', cakeController.postCake)
router.delete('/delete/:itemId', cakeController.deleteCake)
router.delete('/delete', cakeController.deleteAll)

module.exports = router