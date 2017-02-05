var five = require("johnny-five");
var path = require('path');
var express = require('express');

var app = express();
var board = new five.Board();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/blink', function (req, res) {
  // Blink example
  // board.on("ready", function() {
  //   var led = new five.Led(13);
  //   led.blink(500);
  // });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
