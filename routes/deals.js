var express = require('express');
var router = express.Router();
var dealsCtrl = require('../controllers/deals');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get("/deals", dealsCtrl.index);
router.get("/deals/new", ensureLoggedIn, dealsCtrl.new);
router.get("/deals/:id", dealsCtrl.details);
router.get('/deals/:id/edit', ensureLoggedIn, dealsCtrl.edit)
router.post("/deals", ensureLoggedIn, dealsCtrl.create);

router.delete("/deals/:id", ensureLoggedIn, dealsCtrl.delete);

router.put('/deals/:id', ensureLoggedIn, dealsCtrl.update);

module.exports = router