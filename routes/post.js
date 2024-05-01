const postcontroller = require("../controller/postcontroller")
const express = require('express')
const router = express.Router()

router.post('/content', postcontroller.content);
router.get('/deletepost/:id', postcontroller.deletepost)

module.exports  = router