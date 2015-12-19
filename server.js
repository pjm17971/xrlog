/*eslint-disable */

// require packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var jwt        = require('express-jwt');

// routing
var api        = require('./routes/api.js');
var index      = require('./routes/index.js');

// middleware

var auth0_client_id = process.env.AUTH0_CLIENT_ID;
var auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;

console.log(auth0_client_id);
console.log(auth0_client_secret);

var jwtCheck = jwt({
    secret: new Buffer(auth0_client_secret, 'base64'),
    audience: auth0_client_id
});

app.use('/api', jwtCheck); // protect API with JWT
app.use("/public", express.static(__dirname + "/build"));

// routing
app.use('/', index);
app.use('/api', api);

// start
app.listen(process.env.PORT || 8888);

console.log('Server started');