var express = require('express');
var router = express.Router();
var artistsCtrl = require('../controllers/artists');

router.get("/artists", artistsCtrl.index);
router.get("/artists/new", artistsCtrl.new);
router.get("/artists/:id", artistsCtrl.details);
router.post("/artists", artistsCtrl.create);

router.delete('/artists/:id', artistsCtrl.delete);

module.exports = router;