import React from "react";
import './login.css'
import TextFields from "../../component/TextField/TextField";
import {checkName, setName} from "../../entry/actions/userAPI";
import connect from "react-redux/es/connect/connect";
import {sessionService} from "redux-react-session";

class Loggin extends React.Component {
    constructor(props) {
        super(props);
        this.setUserName = this.setUserName.bind(this);
        this.setUserName = this.setUserName.bind(this);
    }

    setUserName(userName) {
        this.props.setName(userName);

    }


    componentDidMount() {
        this.props.getUser.then(name => {//1.Check session 2.Check Name which is saved in a session
            this.props.checkName(name)

        })
    }


    render() {
        return <div>
            <div className="login">
                <form className="loginForm">
                    <TextFields autoFocus={false} func={this.setUserName} label={'Логин'} />
                </form>

            </div>

        </div>

    }
}

const mapStateToProps = () => {
    return {
        getUser: sessionService.loadUser(),
    }
};
const mapDispatchToProps = (dispatch, history) => {
    return {
        setName: (name) => dispatch(setName(name, history)),
        checkName: (name) => dispatch(checkName(name, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loggin)

