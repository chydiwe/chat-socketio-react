import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Loggin from "./component/Login";
import { BrowserRouter as Router} from 'react-router-dom'


ReactDOM.render(<Router><Loggin/></Router>
    , document.getElementById('root'));

serviceWorker.unregister();
