const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userscontroller')


router.get('/', usercontroller.homepage)
router.use('/user', require('./user'))
router.use('/post', require('./post'));
router.use('/comment', require('./comment'))
router.use('/api', require('./api'))
router.use('/likes', require('./likes'))

module.exports = router;