var app = require('./server.js');
var port = 3000;

app.listen(port, function () {
  console.log('Cutesy Local RESTful API listening on port ' + port);
});
