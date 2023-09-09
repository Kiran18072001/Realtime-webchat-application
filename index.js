// Node server which will handle socket io connections
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => { //connects to the socket connection
    socket.on('new-user-joined', name => { // this executes if the new user is joined which will be implemented in the client.js
        // console.log("New User", name) 
        users[socket.id] = name; //appends and assigns the name to the new user
        socket.broadcast.emit('user-joined', name);// Sends the message to everyone that the new user is joined 
    });

    socket.on('send', message => { // If the event send is done, then it sends the message 
        socket.broadcast.emit('receive',
         {message: message, name: users[socket.id] // Everyone in the chat will receive the message with the name of the person sent
        })
    });

    socket.on('disconnect', message => { // This executes if one of the user gets disconnected
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })

})