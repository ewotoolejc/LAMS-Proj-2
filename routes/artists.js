var express = require('express');
var router = express.Router();
var artistsCtrl = require('../controllers/artists');

router.get("/", artistsCtrl.index);
router.get("/new", artistsCtrl.new);
router.get("/:id", artistsCtrl.details);
router.post("/", artistsCtrl.create);

module.exports = router;