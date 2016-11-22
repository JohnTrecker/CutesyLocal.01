var apiRouter = require('express').Router();
var apiController = require('./apiController');

// =====================================================================
// TODO: Create route handlers for each of the methods in apiController
// =====================================================================
apiRouter.route('/venues')
  .get(function(req, res) {
    apiController.retrieve(req, res);
  })
  .post(function(req, res) {
    apiController.createOne(req, res);
  })
  .delete(function(req, res) {
    apiController.delete(req, res);
  });


apiRouter.route('/venues/:number')
  .get(function(req, res) {
    apiController.retrieveOne(req, res);
  })
  .put(function(req, res) {
    apiController.updateOne(req, res);
  })
  .delete(function(req, res) {
    apiController.deleteOne(req, res);
  });

// apiRouter.route('/users')
//   .get(function(req, res) {
//     apiController.retrieve(req, res);
//   })
//   .post(function(req, res) {
//     apiController.createOne(req, res);
//   })
//   .delete(function(req, res) {
//     apiController.delete(req, res);

// apiRouter.route('/users/:number')
//   .get(function(req, res) {
//     apiController.retrieveOne(req, res);
//   })
//   .put(function(req, res) {
//     apiController.updateOne(req, res);
//   })
//   .delete(function(req, res) {
//     apiController.deleteOne(req, res);
//   });

module.exports = apiRouter;

