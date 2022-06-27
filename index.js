// index.js
// where your node app starts

// init project
require('dotenv').config()

const createServer = require('./server');

const app = createServer();

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
