var fs = require('fs');
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');

const url = "mongodb://localhost:27017/traider";
const join = require('path').join;
const models = join(__dirname, 'models');

mongoose.connect(url).connection
    .on('error', console.log)
    .on('open', listen);
fs.readdirSync(models)
	.filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

var server = express();

server.use(express.static(__dirname + '/public'));
server.use('/product/*', express.static(__dirname + '/public'));
server.use('/basket/', express.static(__dirname + '/public'));
server.use(cookieParser());

server.use('/api/products', require('./routes/products.js'))
server.use('/api/cart', require('./routes/cart.js'))
server.use('/api/tags', require('./routes/tags'))

function listen(){
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
	    console.log("Listening on " + port);
	});
}
