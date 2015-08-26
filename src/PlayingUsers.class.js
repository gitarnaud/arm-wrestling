var util = require('util');

var User = require('./User.class.js');
var Users = require('./Users.class.js');

function PlayingUsers() {
}

util.inherits(PlayingUsers, Users);

PlayingUsers.prototype.setUsers = function(users) {
  this.removeListeners();
  this.users = users;
  this.addListeners();
  this.broadcast('start game');
};

//start game, score update, end game
PlayingUsers.prototype.broadcast = function(event, vars) {
  if (vars == undefined) {
  	vars = new Object();
  }
  
  if (event == 'score update') {
	vars.scores = new Object();
	for (var i = 0; i < this.users.length; i++) {
	  vars.scores[this.users[i].socket.id] = this.users[i].score;
	}
  }

  PlayingUsers.super_.prototype.broadcast.call(this, event, vars);
};

//private
PlayingUsers.prototype.addListeners = function(user) {
  for (var i = 0; i < this.users.length; i++) {
    this.users[i].addListener(User.SCORE_UPDATE, this.broadcast.bind(this, 'score update'));
    this.users[i].addListener(User.DISCONNECT, this.onUserDisconnect.bind(this, this.users[i]));
  }
};

PlayingUsers.prototype.removeListeners = function(user) {
  for (var i = 0; i < this.users.length; i++) {
    this.users[i].removeListener(User.SCORE_UPDATE, this.broadcast.bind(this, 'score update'));
    this.users[i].removeListener(User.DISCONNECT, this.onUserDisconnect.bind(this, this.users[i]));
  }
};

PlayingUsers.prototype.onUserDisconnect = function(user) {
  PlayingUsers.super_.prototype.onUserDisconnect.call(this, user);
  this.endGame();
}

PlayingUsers.prototype.endGame = function(user) {
  this.broadcast('end game');
  this.users = new Array();
};

module.exports = PlayingUsers;