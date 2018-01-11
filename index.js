var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var perlin = require('perlin-noise');

import AWSMqtt from 'aws-mqtt-client';

const AWS = require('aws-sdk')

AWS.config.region = 'us-east-1'
AWS.config.credentials = "./keys/aws.json";

var config = require("./keys/aws.json");

var SOUND = 'sensors/sound';
var PIR = 'sensors/pir';

const mqttClient = new AWSMqtt({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  sessionToken: AWS.config.credentials.sessionToken,
  endpointAddress: 'a3958o3k876wh2.iot.us-east-1.amazonaws.com', //"a4xxblx4aa83r.iot.us-east-1.amazonaws.com",
  region: 'us-east-1'
});

mqttClient.on('connect', () => {
	mqttClient.subscribe(SOUND);
  mqttClient.subscribe(PIR);
	console.log('connected to iot mqtt websocket');
//  mqttClient.publish('DDB_sensors_pir', "ok");
});

mqttClient.on('message', (topic, message) => {
  console.log(message.toString());
  console.log(topic);

  var obj = JSON.parse(message);

  //var d = new Date();
  var data = 0;

  if(topic == SOUND) {
     data = obj.soundMaxValue;
  } else if(topic == PIR) {
     data = obj.motionDetected;
  }

  io.emit(topic, {
    "data" : data,
    "time" : obj.timestamp
  });

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

  setInterval(function()
    {
      //var d = new Date();
      // io.emit('data1', {
      //   "data" : getRandomFromNoise(1,5),
      //   "time" : d.toDateString()
      // });
      // io.emit('data2', {
      //   "data" : getRandomFromNoise(100,120),
      //   "time" : d.toDateString()
      // });
      // io.emit('data3', {
      //   "data" : getRandomFromNoise(50,60),
      //   "time" : d.toDateString()
      // });
    },
  1000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
