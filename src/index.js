import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loggin from "./containers/Login/Login";
import Chat from "./containers/Chat/App"
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './entry/store/conf_store'

const Routers = () =>
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Loggin}/>
            <Route exact path='/chat' component={Chat}/>
        </Switch>
    </HashRouter>;
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Routers/>
        </div>
    </Provider>
    , document.getElementById('root'));
