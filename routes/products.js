var express = require('express');
var router = express.Router();
var controller = require('../controllers/products');

router.get('/seed', controller.seed);
router.get('', controller.list);
router.get('/:id', controller.view);
router.get('/tags/:id', controller.getTagInfo);

module.exports = router;
