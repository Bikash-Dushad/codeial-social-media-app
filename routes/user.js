const usercontroller = require('../controller/userscontroller')
const express = require('express')
const router = express.Router()
const passport = require('passport');

router.get('/signuppage', usercontroller.signuppage);
router.post('/signup', usercontroller.signup)

router.get('/signinpage', usercontroller.signinpage)
router.post('/signin', usercontroller.signin)

router.get('/homepage', usercontroller.homepage);
router.get('/updatePage', usercontroller.updatePage)
router.post('/updateProfile/:id', usercontroller.updateProfile)

router.get('/logout', usercontroller.logout)

module.exports = router;