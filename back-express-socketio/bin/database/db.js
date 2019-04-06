const mysql = require('mysql'),
    config = {

        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chat',
        port: 3306
    };
var connection = mysql.createConnection(config);


function getUserId(nickName) {
    return new Promise(resolve => {
        connection.query(`SELECT id  FROM user WHERE nickname='${nickName}';`, function (err, rows, fields) {
            if (Object.values(rows[0])[0] !== undefined)
                resolve(Object.values(rows[0])[0]);
            else
                resolve(false);
        })
    })
}

async function sendMessage(nickName, msg, date) {
    let userId = await getUserId(nickName);
    return new Promise(resolve => {
        connection.query(`INSERT INTO message_table VALUES (null,"${userId}","${msg}","${date}" );`, function (err, rows, fields) {
            if (err)
                resolve(false);
            else resolve(true)
        });
    })

}

function checkUser(nickName) {
    return new Promise(resolve => {
        connection.query(`SELECT count(0)  FROM user WHERE nickname='${nickName}';`, function (err, rows, fields) {
            if (Object.values(rows[0])[0] === 0) {
                resolve(true);
            }
            else resolve(false);
        })
    })
}

async function addUser(nickName) {
    let res = await checkUser(nickName);
    if (res === true) {
        connection.query(`INSERT INTO user VALUES (null,"${nickName}");`, function (err, rows, fields) {
            if (err) console.log(err);

        });
        return true
    }
    else return false

}

function getHistoryMessagesLength() {
    let query = 'SELECT COUNT(id) FROM message_table WHERE id= message_table.id;';
    return new Promise((resolve => connection.query(query, function (err, rows, fields) {
        if (err) console.log(err);
        resolve(Object.values(...rows)[0])
    })))
}

function getHistoryMessages(length) {
    let query = `select message_table.id, user.nickName,message_table.text_data,message_table.message_date FROM message_table INNER JOIN user ON user.id=message_table.user_id ORDER BY id DESC LIMIT ${length},25`
    return new Promise(resolve =>
        connection.query(query, function (err, rows, fields) {
            if (err) console.log(err);
            rows = rows.map((item) => {
                const {nickName, text_data, message_date} = item,
                    date = `${message_date.toLocaleDateString()} ${message_date.toLocaleTimeString()}`;
                return {userName: nickName, text: text_data, timeSend: date}
            });
            resolve(rows.reverse())
        })
    )
}

module.exports = {
    addUser: addUser,
    sendMessage: sendMessage,
    getHistoryMessages: getHistoryMessages,
    getHistoryMessagesLength: getHistoryMessagesLength,
    checkUser:checkUser
};