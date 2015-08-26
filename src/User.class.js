var util = require('util');
var events = require('events');

var Pi = require('./Pi.class.js');

function User() {
  this.socket = undefined;
  this.score = undefined;
}

User.SCORE_UPDATE = 'scoreUpdate';
User.DISCONNECT = 'disconnect';

util.inherits(User, events.EventEmitter);

User.prototype.init = function(socket) {
  this.socket = socket;
  this.score = 0;
  socket.on('press', this.onPress.bind(this));
  socket.on('disconnect', this.onDisconnect.bind(this));
};

User.prototype.send = function(event, vars) {
  this.socket.emit(event, vars);
};

//privates
User.prototype.onPress = function() {
  this.score ++;
  Pi.getInstance().press(Pi.BLUE);
  this.emit(User.SCORE_UPDATE);
};

User.prototype.onDisconnect = function() {
  this.emit(User.DISCONNECT);
};

module.exports = User;