var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart');

router.get('/view', controller.view);
router.get('/add/:productId', controller.addItem);

module.exports = router;

