var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart');

router.get('/view', controller.view);

module.exports = router

