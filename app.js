

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('message', 'welcome');


  console.log('a user connected');
  socket.on('choice', function(what){
    console.log('chosen: ' + what);

    if(what === 'justin beiber')
      votes['justin beiber']++;
    else
      votes['one direction']++;

    console.log(votes);

    socket.emit('total',votes);

  });
});


var votes = {
  'justin beiber' : 0,
  'one direction' : 0
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});
