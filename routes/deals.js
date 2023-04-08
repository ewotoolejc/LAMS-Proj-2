var express = require('express');
var router = express.Router();
var dealsCtrl = require('../controllers/deals');


router.get("/deals", dealsCtrl.index);
router.get("/deals/new", dealsCtrl.new);
router.get("/deals/:id", dealsCtrl.details);
router.post("/deals", dealsCtrl.create);


module.exports = router