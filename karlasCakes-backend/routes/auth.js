const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/me', ensureAuth,authController.getCurrentUser)
router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)
router.get("/profile", ensureAuth, authController.getCurrentUser)
router.delete('/logout', authController.logout)

module.exports = router