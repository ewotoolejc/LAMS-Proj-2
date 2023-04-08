var express = require('express');
var router = express.Router();
var dealsCtrl = require('../controllers/deals');


router.get("/deals", dealsCtrl.index);
router.get("/deals/new", dealsCtrl.new);
router.get("/deals/:id", dealsCtrl.details);
router.get('/deals/:id/edit', dealsCtrl.edit)
router.post("/deals", dealsCtrl.create);

router.delete("/deals/:id", dealsCtrl.delete);

router.put('/deals/:id', dealsCtrl.update);

module.exports = router