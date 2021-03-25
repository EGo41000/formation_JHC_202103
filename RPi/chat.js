// SERVEUR

const app = require('express')();
const rest = require('http');
const http = rest.createServer(app);
const io = require('socket.io')(http);
const os = require('os');
const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
});
var sense = require("sense-hat-led");

console.log("networkInterfaces:", os.networkInterfaces());

// =======================================================
// API pour alumer/éteindre la LED
// On ajoute aussi un message dans le chat.
var state=0;
app.put('/arduino/:v', (req, res) => {
  console.log("app PUT ARDUINO", req.params);
	res.send("OK");
	state = parseInt(req.params.v);
	io.emit('chat message', "LED: "+req.params.v);
	port.write(req.params.v);
});
app.get('/arduino', (req, res) => {
  console.log("app GET ARDUINO", req.params);
	res.send(state ? "ON" : "OFF");
});
app.put('/led/:msg', (req, res) => {
  console.log("app PUT LED", req.params);
  res.send("OK");
  sense.showMessage(req.params.msg);
});

// =======================================================
// Serveur de fichiers WEB
app.get('/', (req, res) => {
	res.redirect('/index.html');
});

app.get('/:fn?', (req, res) => {
  console.log("app GET "+req.params.fn);
  res.sendFile(__dirname + '/'+req.params.fn);
});

// =======================================================
// Socket.io CHAT
io.on('connection', (socket) => {
  console.log('user ['+socket.id+'] connected @ '+socket.handshake.address);
  //console.log(socket);
  socket.broadcast.emit('chat message', "Nouveau client, "+new Date());

  socket.on('disconnect', () => {
    console.log('user ['+socket.id+'] disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message ['+socket.id+']: ', msg);
    //io.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
    // Teste si le message contiens 'ON' ou 'OFF' pour faire un appel à l'API
    if (msg.indexOf("ON")>=0) {
	    // Requete PUT vers l'API
	    rest.request({host:'localhost', port:3000, path:'/arduino/1', method:"PUT"}, function(){console.log("done");}).end();
	    console.log("turn ON");
    }
    if (msg.indexOf("OFF")>=0) rest.request({host:'localhost', port:3000, path:'/arduino/0', method:"PUT"}).end();
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

