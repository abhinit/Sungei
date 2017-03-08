var express = require('express');
var router = express.Router();
var controller = require('../controllers/products');

router.get('/seed', controller.seed);

module.exports = router
