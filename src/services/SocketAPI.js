import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8001');

export function getMessage(cb) {
    socket.on('message', function (msg) {
        if (msg.event === 'messageReceived')
            cb(msg)
    })
}


export function sendMessageInChat(msg) {
    socket.emit('message',msg)
}

export  function resAddUser(cb) {
    socket.on('addUser',function (msg) {
        cb(msg.status)
    })
}
export function connectChat(msg) {
    console.log(msg);
    socket.emit('connection',msg)
}
export function disconnectChat() {
    socket.off('addUser');
    socket.off('message');

}
export function addUser(msg) {
    socket.emit('addUser',msg)
}