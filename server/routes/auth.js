const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
//const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/me', authController.getCurrentUser)
router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)