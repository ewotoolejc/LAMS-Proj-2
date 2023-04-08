var express = require('express');
var router = express.Router();

var songsCtrl = require('../controllers/songs');

router.post('/artists/:id/songs', songsCtrl.create);
router.delete('/songs/:id', songsCtrl.delete);

module.exports = router;