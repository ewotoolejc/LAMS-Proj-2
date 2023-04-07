var express = require('express');
var router = express.Router();
var dealsCtrl = require('../controllers/deals');


router.get("/", dealsCtrl.index);
router.get("/new", dealsCtrl.new);


module.exports = router