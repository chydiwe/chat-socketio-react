import React, {Component} from 'react';
import './App.css';
import {connectChat, disconnectChat, getMessage, sendMessageInChat} from "../../services/SocketAPI";
import TextFields from "../../component/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import ChatWindow from "../../component/ChatWindow/ChatWindow";
import {getHistory} from "../../entry/actions/getHistory";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    chat: {
        background: "rgba(238, 238, 238, 0.64)",
        [theme.breakpoints.down('sm')]: {
            width: "90vw",
        },
        [theme.breakpoints.up('md')]: {
            width: "60vw",
        },
        [theme.breakpoints.up('lg')]: {
            width: "40vw",
        }
    }
})
class Chat extends Component {
    constructor(props) {
        super(props);
        getMessage((msg) => {//get message from socket
            let temp = this.state.chatMessages;
            temp.push({userName: msg.name, text: msg.text, timeSend: msg.time});
            this.setState({chatMessages: temp,statusUpdate:'getMessage'});
        })
        this.state = {
            chatMessages: [],
            statusUpdate:'',//status for target scrollbar
        };
        this.setForChatMessageHistory = this.setForChatMessageHistory.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }


    componentDidMount() {
        const userName = this.props.session.user;
        if (typeof userName !== "object") {// check session(if userName not exist session give Object)
            this.setState({userName: userName});
            connectChat('new connection');//Connect socket
        }
        else this.props.history.push('/')


    }

    setForChatMessageHistory() {
        if (this.props.historyMessages) {//If not end messages history(historyMessages=[messages]) if end (historyMessages={status:false}
            let temp = this.state.chatMessages;
            this.setState({chatMessages: [...this.props.historyMessages, ...temp,],statusUpdate:'getHistoryMessages'})
        }
    }


    sendMessage(message) {
        const date = new Date();
        const chatMessages = [...this.state.chatMessages, {
            userName: this.state.userName,
            text: message,
            timeSend: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.toLocaleTimeString()}`
        }]
        sendMessageInChat({name: this.state.userName, text: message.trim()});
        this.setState({chatMessages: chatMessages,statusUpdate:'sendMessage'})

    }
    componentWillUnmount(){
        disconnectChat();
    }
    render() {
        const {chatMessages,statusUpdate} = this.state,
            {sendMessage, setForChatMessageHistory} = this,
            {classes,getHistroyMessages, session, historyMessages} = this.props;
        return (
            <div >
                {typeof session.user === 'string' ? <div className={classes.chat}>
                    <ChatWindow getHistroyMessages={getHistroyMessages} chatMessages={chatMessages}
                                historyMessages={historyMessages}
                                userName={this.state.userName} setForChatMessageHistory={setForChatMessageHistory} statusUpdate={statusUpdate}/>
                    <TextFields autoFocus={true} func={sendMessage}/>
                </div> : <div/>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        session: state.session,
        historyMessages: state.historyMessages
    }
};
const mapStateToDispatch = dispatch => {
    return {
        getHistroyMessages: (length) => dispatch(getHistory(length))
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapStateToDispatch)(Chat))

