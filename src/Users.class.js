var util = require("util");
var events = require("events");

var User = require('./User.class.js');

function Users() {
}

util.inherits(Users, events.EventEmitter);

Users.prototype.init = function() {
  this.users = new Array();
};

Users.prototype.add = function(user) {
  user.addListener(User.DISCONNECT, this.onUserDisconnect.bind(this, user));
  this.users.push(user);
};

Users.prototype.indexOf = function(user) {
	return this.users.indexOf(user);
};

Users.prototype.remove = function(user) {
  var index = this.users.indexOf(user);
  if (index > -1) {
    this.users.splice(index, 1);
  }
  user.removeListener(User.DISCONNECT, this.onUserDisconnect.bind(this, user));
}

Users.prototype.broadcast = function(event, vars) {
  if (vars == undefined) {
  	vars = new Object();
  }
  
  for (var i = 0; i < this.users.length; i++) {
   this.users[i].send(event, JSON.stringify(vars));
  }
};

//private
Users.prototype.onUserDisconnect = function(user) {
  this.remove(user);
};

module.exports = Users;