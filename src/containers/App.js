import React, { Component } from 'react';
import '../App.css';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessages: []
        };
        this.sendMessage = this.sendMessage.bind(this)

    }

    componentDidMount() {
        if (localStorage.getItem('chat') === null) {
        }
        else {
            const chatMessages = JSON.parse(localStorage.getItem('chat'))
            this.setState({chatMessages})

        }
    }


    componentDidUpdate() {
        localStorage.setItem("chat", JSON.stringify(this.state.chatMessages))
        let scroll = document.getElementsByClassName("chatWindow")[0];
        scroll.scrollTop = scroll.scrollHeight;
    }

    sendMessage(message) {
        const date = new Date()
        const chatMessages = [...this.state.chatMessages, {
            userName: this.props.location.search.substr(10),
            text: message,
            timeSend: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }]
        this.setState({chatMessages})
    }

    render() {
        const {chatMessages} = this.state;
        const {sendMessage} = this;
        return (
            <div className='chat'>
                <ChatWindow chatMessages={chatMessages} userName={this.props.location.search.substr(10)}/>
                <SendChat sendMessage={sendMessage}/>
            </div>
        )
    }
}

class SendChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.changeMessage = this.changeMessage.bind(this)
        this.send = this.send.bind(this)
    }

    changeMessage(event) {
        this.setState({message: event.target.value})
    }

    send(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)

    }

    render() {
        return (<div className="send">
                <input type="text" onChange={this.changeMessage}/>
                <button onClick={this.send}>отправить</button>
            </div>
        )
    }

}

const ChatWindow = ({chatMessages,userName}) =>
    <div className="chatWindow">
        {(chatMessages.length === 0) ? <p>Send Message</p> : chatMessages.map((item, i) =>
            <div key={i}
                 className={(userName=== item.userName) ? "message" : "messageOther"}>
                <div className="userName"><p>{item.userName}</p></div>

                <div className="messageUser"><p>{item.text}</p><p className="dateSend">{item.timeSend}</p></div>

            </div>)}
    </div>

