var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var perlin = require('perlin-noise');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var noiseIndex = 0;
var noise = perlin.generatePerlinNoise(480, 480);

var getRandomFromNoise = function(min, max) {
    if(noiseIndex++ >= noise.length) {
        noiseIndex = 0;
    }

    var n = noise[noiseIndex];
    return n * (max - min) + min;
};

io.on('connection', function(socket){

  //});

  setInterval(function()
    {
      var d = new Date();
      io.emit('data1', {
        "data" : getRandomFromNoise(1,5),
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
  1000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
