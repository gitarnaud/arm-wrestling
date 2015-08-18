var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var User = require('./src/User.class.js');
var Users = require('./src/Users.class.js');
var PlayingUsers = require('./src/PlayingUsers.class.js');


// web part
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});


// realtime part
var activeUsers = new Users();
activeUsers.init();

var playingUsers = new PlayingUsers();
playingUsers.init();

io.on('connection', function(socket){
  console.log('user connected');
  
  var user = new User();
  user.init(socket);
  
  activeUsers.add(user);
  
  user.on(User.DISCONNECT, function() {
    console.log('user disconnected');
  });
});

//check if a new game is available
setInterval(function() {
console.info('active => ' + activeUsers.users.length + ', playing => ' + playingUsers.users.length);
  if (playingUsers.users.length == 0 && activeUsers.users.length >= 2) {
    var users = new Array();
    users.push(activeUsers.users.shift());
    users.push(activeUsers.users.shift());
    
    activeUsers.add(users[0]);
    activeUsers.add(users[1]);
    
    playingUsers.setUsers(users);
  }
}, 2000);
