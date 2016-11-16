// var mongoose = require('mongoose');
// var mongoUri = 'mongodb://localhost/pokemon';
// var Pokemon = require('../resources/pokemon/Pokemon');
// mongoose.Promise = require('bluebird');

// // ================================================
// // Node can automatically read a JSON file like so
// // ================================================
// var data = require('../../data/yelp.json');

// // Connect Mongoose to our local MongoDB via URI specified above and export it below
// mongoose.connect(mongoUri);
// var db = mongoose.connection;
// db.on('err', console.error.bind(console, 'Hold your horses! Connection error: '));
// db.once('open', function() {
//   console.log('You\'re connected to MongoDB');

//   Pokemon.remove({}, function(error) {
//     if (error) { console.log('Failed to clear database'); }
//   });
//   // =================================
//   // Alternate way to save to MongoDB
//   // =================================
//   data.forEach(function(pokemon) {
//     var newPokemon = new Pokemon(pokemon);

//     newPokemon.save(function(error) {
//       if (error) {
//         console.log('Could not save new pokemon');
//       }
//     });
//   });
// });

// module.exports = db;