console.log("mon script");

var socket = io();

function led(value) {
	console.log("LED: "+value);
	  //socket.emit('chat message', "LED: "+value);
	$.ajax({url: '/arduino/'+value, method:'PUT'});
}


$( document ).ready(function() {
  console.log("page chargée"); 


  var form = document.getElementById('form');
  var input = document.getElementById('mesg');
  var messages = document.getElementById('messages');
  
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      console.log("Value: "+input.value);
      socket.emit('chat message', input.value);
      //socket.emit('chat message', {'msg': input.value, 'user':'XXX'});
      input.value = '';
    }
  });
  
  // TODO à modifier pour affichage temporaire
  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

}); // fin de document ready !
