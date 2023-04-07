var express = require('express');
var router = express.Router();
var watchCtrl = require('../controllers/watch');

router.get("/watch", watchCtrl.index);

module.exports = router;