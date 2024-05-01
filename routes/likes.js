const express = require('express');
const router = express.Router();
const likeController = require('../controller/likescontroller')

router.post('/toggle', likeController.toggleLike)

module.exports = router;