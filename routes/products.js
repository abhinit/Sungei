var express = require('express');
var router = express.Router();
var controller = require('../controllers/products');

router.get('/seed', controller.seed);
router.get('/list', controller.list)
router.get('/:id', controller.view)

module.exports = router
