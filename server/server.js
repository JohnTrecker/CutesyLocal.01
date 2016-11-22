var express    = require('express');
var bodyParser = require('body-parser');
var request    = require('request');
var cheerio    = require('cheerio');
var path       = require('path');
var fs         = require('fs');
// var morgan = require('morgan');
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



app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://http://dogtrekker.com/events/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Cutesy Local RESTful API!' });
});

module.exports = app;