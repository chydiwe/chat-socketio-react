import React from "react";
 import {Link,} from 'react-router-dom'
import '../login.css'

class Loggin extends React.Component {
    constructor(props) {
        super(props);
        this.setUserName = this.setUserName.bind(this)
        this.state={
            userName: ''
        }
    }

    setUserName(event) {
        const name = document.getElementById('username').value
        this.setState({userName: name});

    }

    render() {
        return <div>
            <div className="login">
                <form className="loginForm">
                    <div className="username">Username</div>
                    <input type="text" id="username" onBlur={this.setUserName}/>
                    <Link to={`/chat?username=${this.state.userName}`}>
                        <button >GO CHAT</button>
                    </Link>


                </form>

            </div>

        </div>

    }
}

export default Loggin
