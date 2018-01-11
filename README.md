# MQTT to SOCKET IO Streaming example

### WHY
This is a simple translator between MQTT AWS and Socket.io. It is used to subscribe live web apps to MQTT messaging, and keeping them lean. Think of it as a bridge between raw IOT and lively web.

### HOW
aws-mqtt-client library is used to subscribe to AWS IOT messages through MQTT, then translates each "TOPIC"  to Socket.io and streams live.

### INSTALLATION
To be able to install this, you need to add your AWS keys under "keys" directory on the root folder.
We did not include the keys for your security.

For aws.json format should be as

```javascript
{
  "accessKeyId": "youracceskey",
  "secretAccessKey": "yoursecretkey",
  "region": "us-east-1"
}
```

After setting up AWS Keys, RUN
> npm install
> The project uses ES6 syntax, soo keep mind that you will need BABEL CLI installed.

### RUN
To run the repository, use
> npm run
