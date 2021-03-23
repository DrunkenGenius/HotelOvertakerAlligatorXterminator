var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// initialization of the room ---
let items = [];
function Item(name,description){
	this.name = name;
	this.description = description;
}
items.push( new Item('coin','a golden coin') );
items.push( new Item('sword','a long iron sword') );
items.push( new Item('apple','a red fruit') );
// initialization of the room --- done

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('theItems', JSON.stringify(items));  // refresh the list of items

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    let words = msg.split(' ');
    if (words[0]=='create'){
    	items.push( new Item(words[1],'some description') );
    	io.emit('theItems', JSON.stringify(items)); // refresh the list of items
    }
    if (words[0]=='remove'){
    	let indexToRemove = items.findIndex((elem)=>elem.name==words[1]);
    	console.log( items,indexToRemove );
    	if (indexToRemove!=-1){
    		items.splice(indexToRemove,1);
    		io.emit('theItems', JSON.stringify(items)); // refresh the list of items
    	} else {
    		io.emit('chat message', 'Could not remove '+words[1]+'!'); 
    	}
    }

    io.emit('chat message', msg); // to all!
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});