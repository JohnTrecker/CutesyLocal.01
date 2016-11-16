var express = require('express');
var bodyParser = require('body-parser');
// var morgan = require('morgan');
var path = require('path');
// var db = require('./db');

// Create the Express application:
var app = express();

// Attach middleware:
// app.use(bodyParser.urlencoded({ extended: false })); // may need additional
app.use(bodyParser.json());
// ===========================================================
// Use app.use(URL, router) to apply route to express instance
// ===========================================================
app.use(express.static('./client'));

// Import the pokemonRouter and assign it to the correct route:
// var pokemonRouter = require('./resources/pokemon/pokemonRouter');

// app.use('/api/pokemon', pokemonRouter);

app.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Cutesy Local RESTful API!' });
});

module.exports = app;

