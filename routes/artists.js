var express = require('express');
var router = express.Router();
var artistsCtrl = require('../controllers/artists');

router.get("/artists", artistsCtrl.index);
router.get("/artists/new", artistsCtrl.new);
router.get("/artists/:id", artistsCtrl.details);
router.get('/artists/:id/edit', artistsCtrl.edit)
router.post("/artists", artistsCtrl.create);

router.delete('/artists/:id', artistsCtrl.delete);

router.put('/artists/:id', artistsCtrl.update);
router.put('/deals/:id/artists', artistsCtrl.addArtist);

module.exports = router;