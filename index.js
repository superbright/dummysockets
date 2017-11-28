var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  //});

  setInterval(function()
    {
      var d = new Date();

      io.emit('data1', {
        "data" : (Math.random() * (10 - 0) + 0),
        "time" : d.toDateString()
      });
      io.emit('data2', {
        "data" : (Math.random() * (100 - 0) + 0),
        "time" : d.toDateString()
      });
      io.emit('data3', {
        "data" : (Math.random() * (500 - 0) + 0),
        "time" : d.toDateString()
      });
    },
  3000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
