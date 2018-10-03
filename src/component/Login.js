import React from "react";
import Chat from '../containers/App'
import {Link, Route} from 'react-router-dom'
import '../login.css'
class Loggin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userName: ''
        };

        this.setUserName=this.setUserName.bind(this)
    }

   setUserName(){
        const name=document.getElementById('username').value
        this.setState({userName:name});

   }
    render() {
        return <div className="login">
            <form className="loginForm">
                <div className="username">Username</div>
                <input type="text" id="username"/>
                <Link to='/Chat'><button onClick={this.setUserName}>SetName</button></Link>


            </form>
            <div>
                <Route path='/Chat' render={()=><Chat username={this.state.userName}/>}/></div>
        </div>

    }
}

export default Loggin
