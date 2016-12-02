var express    = require('express');
var app        = express();
var apiRouter = require('./resources/api/apiRouter');

// app.use(bodyParser.json());
app.use(express.static('./client'));
app.use('/api', apiRouter);

module.exports = app;

// var bodyParser = require('body-parser');
// var request    = require('request');
// var cheerio    = require('cheerio');
// var geocoding  = require('google-geocoding');
// var path       = require('path');
// var fs         = require('fs');
// var morgan = require('morgan');
// var db = require('./db');

// app.get('/', function(req, res){
//   res.json({ message: 'Welcome to the Cutesy Local RESTful API!' });

//   // scrape for local dog events
//   var url = 'http://dogtrekker.com/events';
//   var json = {
//     total: null,
//     businesses: []
//   }

//   // TODO: String requests
//   request(url, function(error, response, body){
//     if(error) {
//       console.log(error);
//     }
//     console.log("Status code: ", response.statusCode);

//     var $ = cheerio.load(body);
//     $('div#events > div.activity').each(function(value, index) {
//         if ( $(this).find('div.ypaddress').text().includes('San Francisco') ) {
//         // collection
//         var data = {
//           "image_url": null,
//           "dates": null,
//           "description": null,
//           "location": {
//             "address1": null,
//             "zip_code": null,
//             "state": "CA",
//             "country": "US",
//             "city": "San Francisco"
//           },
//           "name": null,
//           "categories": [
//             {
//               "alias": "events",
//               "title": "Dog Events"
//             }
//           ],
//           "id": null,
//           "url": null,
//           "coordinates": {
//             "latitude": null,
//             "longitude": null
//           }
//         }
//         var loc = $(this).find('div.ypaddress').text().trim();
//         console.log("'loc' of entry ", index," equals:\n", loc);
//         var address = loc.slice(0, loc.indexOf('Phone:')).trim();
//         console.log("'address' of entry ", index," equals:\n", address);
//         var raw = $(this).text().trim();
//         console.log("'raw' of entry ", index," equals:\n", raw);

//         // TODO: verify address1
//         data.name = $(this).find('div.title > a').text().trim();
//         data.location.address1 = address.slice(0, address.indexOf(','));
//         data.location.zip_code = address.slice(-5);
//         data.dates = raw.slice(raw.indexOf('\r\n'), raw.indexOf('\r\n\r\n'));
//         data.url = 'http://dogtrekker.com' + $(this).find('div.activitylinks > a:nth-child(2)').attr('href');
//         console.log()
//         geocoding.geocode(address, function(err, location) {
//             if (err) {
//               console.log('Error: ' + err);
//             } else if( !location ) {
//               console.log('No result.');
//             } else {
//               data.coordinates.latitude = location.lat;
//               data.coordinates.longitude = location.lng;
//             }
//         });

//         // // get description in second request
//         // request(data.url, function(error, response, eventPage){
//         //   if(error) {
//         //     console.log(error);
//         //   }
//         //   console.log("Status code: ", response.statusCode);

//         //   var $details = cheerio.load(eventPage);
//         //   data.description = $details('p.event-description').text().trim();
//         //   data.dates = $details('div.primary.event > span').text().trim();
//         // });

//         json.businesses.push(data);
//       }

//     });

//     // update json data
//     json.total = json.businesses.length;
//     // write json to new data file
//     fs.writeFile('data/events.json', JSON.stringify(json, null, 4), function(error) {
//       if (error) throw error;
//       console.log("New events saved.");
//     })

//   })
// })