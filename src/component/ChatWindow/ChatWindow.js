import React from "react";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    chatWindow: {
        height: "60vh",
        display: 'flex',
        alignItems: 'center',
        overflow:'scroll',
        overflowX:'hidden',
        flexFlow:'column nowrap',
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

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.getHistoryOnTop = this.getHistoryOnTop.bind(this);
        this.state = {
            currentY: 0,

        }
    }

    getHistoryOnTop(event) {
        if (event.target.scrollTop === 140) {//Get history
            this.setState({currentY: event.target.scrollHeight});//save pos scrollbar
            this.props.getHistroyMessages(this.props.chatMessages.length).then(() => {
                this.props.setForChatMessageHistory();
            })
        }

    }

    componentDidMount() {
        let scroll = document.getElementById('chatWindow');//use eventListener for scroll
        scroll.addEventListener('scroll', this.getHistoryOnTop);
        this.props.getHistroyMessages(0).then(() => {          //get last 25 messages
            this.props.setForChatMessageHistory();
            scroll.scrollTop = scroll.scrollHeight;
        })
    }

    componentDidUpdate() {
        let chatWindow = document.getElementById('chatWindow');//check pos scroll for change posScroll
        if (!this.props.historyMessages)
            chatWindow.removeEventListener('scroll', this.getHistory);

        switch (this.props.statusUpdate) {
            case 'getMessage': {
                if (chatWindow.scrollHeight <= chatWindow.scrollTop + 1000)//set scroll target bottom
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                break;
            }
            case 'sendMessage': {
                chatWindow.scrollTop = chatWindow.scrollHeight; //set scroll target bottom
                break;
            }
            case 'getHistoryMessages': {
                chatWindow.scrollTop = chatWindow.scrollHeight - this.state.currentY;//save pos when get history
                break;
            }
            default: {
                break;
            }
        }
    }

    componentWillUnmount() {
        let chatWindow = document.getElementById('chatWindow');
        chatWindow.removeEventListener('scroll', this.getHistoryOnTop);
    }

    render() {
        const {chatMessages, userName, classes} = this.props;

        return (<div className={classes.chatWindow} id='chatWindow'>
            {(chatMessages.length === 0) ? <p>Send Message</p> : chatMessages.map((item, i) =>
                <div key={i}
                     className={(userName === item.userName) ? "message" : "messageOther"}>
                    <div className="userName"><p>{item.userName}</p></div>

                    <div className="messageUser"><p className='dataMessage'>{item.text}</p><p className="dateSend">{item.timeSend}</p></div>

                </div>)}
        </div>)

    }
}

export default withStyles(styles)(ChatWindow);