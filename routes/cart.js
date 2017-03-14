var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart');

router.get('/', controller.view);
router.post('/add', controller.addItem);

module.exports = router;

