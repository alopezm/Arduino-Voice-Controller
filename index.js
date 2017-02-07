// Dependecnies
var five = require("johnny-five");
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// Global Variables
var PORT = 3000;
var ACTIONS = {
  TURN_ON: 'turn on',
  TURN_OFF: 'turn off'
};
var device = 'light'

// Declarations
var board = new five.Board();
var app = express();
var rooms = {
  'my room': { pin: 13 },
  kitchen: { pin: 12 },
  bathroom: { pin: 11 }
};

app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.redirect('/static');
});

app.post('/action', function (req, res) {
  var params = req.body;
  var command = params.command;
  var action = '';
  var room = '';

  console.log('params: ', params);
  // Version 2
  // var reg = new RegExp('(turn on|turn off).*(main room|kitchen|house)');
  // Version 3
  var actionsStr = ACTIONS.TURN_ON + '|' + ACTIONS.TURN_OFF;
  var roomsStr = Object.keys(rooms).join('|');
  var reg = new RegExp('(' + actionsStr + ').*'+ device + '.*(' + roomsStr + ')');

  var match = reg.exec(command);
  if (match && match.length >= 3) {
    action = match[1];
    room = match[2];
    switch (action) {
      case ACTIONS.TURN_ON:
        rooms[room].light.on();
        break;
      case ACTIONS.TURN_OFF:
        rooms[room].light.off();
        break;
    }
    var result = {
      action: action,
      room: room
    };
    console.log(result);
    res.send(msg);
  } else {
    var msg = 'Invalid command: ' + command;
    console.error(msg);
    res.send(msg);
  }
});

board.on("ready", function () {
  // Start the pins
  Object.keys(rooms).forEach(function (roomName) {
    var pin = rooms[roomName].pin;
    rooms[roomName].light = new five.Led(pin);
  });

  // Start the server
  app.listen(PORT, function () {
    console.log('Listening on localhost:' + PORT);
  });
});
