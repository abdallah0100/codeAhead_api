const router = require('express').Router();
const routerController = require('./routerController');
const db = require('../database/connection.js');

router.post('/register', routerController.handleRegister);
router.post('/login', routerController.handleLogin);

module.exports = router;