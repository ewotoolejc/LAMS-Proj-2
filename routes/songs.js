var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

var songsCtrl = require('../controllers/songs');

router.post('/artists/:id/songs', ensureLoggedIn, songsCtrl.create);
router.delete('/songs/:id', ensureLoggedIn, songsCtrl.delete);

module.exports = router;