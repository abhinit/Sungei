var express = require('express');
var router = express.Router();
var controller = require('../controllers/tags');

router.get('/list', controller.list);
router.get('/:name', controller.viewProducts);

module.exports = router;
