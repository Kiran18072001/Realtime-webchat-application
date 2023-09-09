// const socket = io('https://localhost:8000', {transports:['']});
const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById('send-cont');
const messageInp = document.getElementById('messageInput');
const messageCont = document.querySelector('.container') //to display the message in the container

// Appending the message (who joined the chat) by creating a new div with the position in the container block
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageCont.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
} 

var audio = new Audio('Messenger.mp3');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

// const names = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', names);

//Listens the user-joined event and appends the message in the container
socket.on('user-joined', names => {
    append(`${names} joined the chat`, 'right');
});


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})


