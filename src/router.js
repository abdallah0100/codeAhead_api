const router = require('express').Router();
const routerController = require('./routerController');
const db = require('../database/connection.js');

router.post('/register', routerController.handleRegister);
router.post('/login', routerController.handleLogin);
router.post('/fetchCategories', routerController.fetchCategories);
router.post('/fetchSubCategory', routerController.fetchSubCategory);
router.post('/fetchCatName', routerController.fetchSubCatName);

module.exports = router;