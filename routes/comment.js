const commentsController = require('../controller/commentcontroller')
const express = require('express')
const router = express.Router()

router.post('/create', commentsController.create);
router.get('/deletecomment/:id', commentsController.deletecomment)
module.exports  = router