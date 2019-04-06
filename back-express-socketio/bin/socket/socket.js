const db = require('../database/db')

function dataFormat() {
    return `${(new Date).getFullYear()}-${(new Date).getMonth()}-${(new Date).getDate()} ${(new Date).toLocaleTimeString()}`
}

function socketApi(socket,) {
    socket.on('message', function (msg) { //add message on chat and on db userAPI
        let time = dataFormat();
        // Уведомляем клиента, что его сообщение успешно дошло до сервера
        socket.emit('message', {'event': 'messageSent', 'name': msg.name, 'text': msg.text, 'time': time});
        db.sendMessage(msg.name, msg.text, time).then((res) => {
                if (res)
                    socket.broadcast.emit('message', {
                        'event': 'messageReceived',
                        'name': msg.name,
                        'text': msg.text,
                        'time': time
                    })

                else
                    socket.emit('message', {
                        'event': 'messageSent',
                        'name': msg.name,
                        'text': "Ваше сообщение не отправлено",
                        'time': time
                    })
            }
        )

    });
    
    socket.on('disconnect', function () {
    })
}

module.exports = socketApi;