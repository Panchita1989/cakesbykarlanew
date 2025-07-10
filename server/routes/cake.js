const express = require('express')
const router = express.Router()
const cakeController = require('../controller/cake')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//router.get('/', ensureAuth, cartController.getCart)
router.post('/add', ensureAuth, cakeController.postCake)
//router.put("/change:itemId", ensureAuth, cartController.getCurrentUser)
//router.delete('/delete:itemId', ensureAuth, cartController.deleteCake)

module.exports = router