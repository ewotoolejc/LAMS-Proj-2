var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/:id/edit', usersCtrl.edit);

router.put('/:id', usersCtrl.update);

module.exports = router;
