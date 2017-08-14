var fs = require('fs');
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
var appRouter = require('./routes/users');

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

server.use(bodyParser.json());
// server.use(bodyParser.urlencoded);
server.use(express.static(__dirname + '/public'));
server.use('/product/*', express.static(__dirname + '/public'));
server.use('/basket/', express.static(__dirname + '/public'));
server.use('/tags/*', express.static(__dirname + '/public'));
server.use('/register/', express.static(__dirname + '/public'));
server.use('/login/', express.static(__dirname + '/public'));
server.use('/logout/', express.static(__dirname + '/public'));
server.use('/profile/', express.static(__dirname + '/public'));
server.use('/checkout/', express.static(__dirname + '/public'));

server.use(morgan('dev'));
server.use(cookieParser());

// Handle sessions
server.use(expressSession({
    secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn'
}));

server.use('/api/products', require('./routes/products.js'));
server.use('/api/cart', require('./routes/cart.js'));
server.use('/api/tags', require('./routes/tags.js'));
server.use('/api/users', require('./routes/users.js'));
server.use('/api/authenticate', require('./routes/authenticate.js'));    
server.use('/api/currentuser', require('./routes/currentUser.js')); 
server.use('/api/orders', require('./routes/order.js')); 

function listen(){
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
	    console.log("Listening on " + port);
	})
};
