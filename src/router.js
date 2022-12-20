const router = require('express').Router();
const routerController = require('./routerController');
const db = require('../database/connection.js');

router.post('/register', routerController.handleRegister);

module.exports = router;