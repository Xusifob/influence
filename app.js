var express = require('express');
var app = express();
var choices = require('./choices.json');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var votes = null;
var random = 0;

var start = function () {
  random = Math.floor(Math.random()*choices.length);

  votes =  choices[random];
  votes.left.total = 0;
  votes.right.total = 0;

  io.sockets.emit('votes', votes);
};

setInterval(function(){
  start();
},3000);
start();

io.on('connection', function(socket){
  // send all data
  socket.emit('votes', votes);

  // On hover
  socket.on('onhover', function(what){
    if (what === 'left') {
      votes.left.total++;
    } else {
      votes.right.total++;
    }
    io.sockets.emit('total', votes);
  });

  // Off hover
  socket.on('offhover',function(what){
    if (what === 'left') {
      votes.left.total--;
    } else {
      votes.right.total--;
    }
    io.sockets.emit('total', votes);
  })

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});