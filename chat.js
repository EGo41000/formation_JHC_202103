// SERVEUR

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  console.log("app.GET:");
  console.log(res.headers);
  console.log(req.query);
  //res.send('<h1>Hello world mon PC</h1>');
  res.sendFile(__dirname + '/index.html');
});

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
  });

  socket.on('keyup', (msg) => {
    console.log('keyup ['+socket.id+']: ');
    socket.broadcast.emit('keyup', socket.id+' is typing !');
    //io.emit('chat message', msg);
    //socket.broadcast.emit('chat message', msg);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});