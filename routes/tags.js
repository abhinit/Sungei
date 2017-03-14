var express = require('express');
var router = express.Router();
var controller = require('../controllers/tags');

router.get('', controller.list);
router.get('/:id', controller.viewProducts);

module.exports = router;
