var express = require('express');
var router = express.Router();
var artistsCtrl = require('../controllers/artists');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get("/artists", artistsCtrl.index);
router.get("/artists/new", ensureLoggedIn, artistsCtrl.new);
router.get("/artists/:id", artistsCtrl.details);
router.get('/artists/:id/edit', ensureLoggedIn, artistsCtrl.edit)
router.post("/artists", ensureLoggedIn, artistsCtrl.create);

router.delete('/artists/:id', ensureLoggedIn, artistsCtrl.delete);

router.put('/artists/:id', ensureLoggedIn, artistsCtrl.update);
router.put('/deals/:id/artists', ensureLoggedIn, artistsCtrl.addArtisttoDeal);
router.put('/artists/:id/signed', ensureLoggedIn, artistsCtrl.updateToSigned);
router.put('/artists/:id/user', ensureLoggedIn, artistsCtrl.updateUser);

module.exports = router;