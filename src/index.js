import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loggin from "./containers/Login";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./containers/App";

const App = () =>
    <Switch>
        <Route exact path='/' component={Loggin}/>
        <Route path='/chat' component={Chat}/>
    </Switch>
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>
    , document.getElementById('root'));

