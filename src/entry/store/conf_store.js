import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from "../redusers/rootReducer";
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {sessionService} from 'redux-react-session';

export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
export const store = createStore(rootReducer, applyMiddleware(...middleware,));

const options = {refreshOnCheckAuth: true, redirectPath: '/', driver: 'COOKIES',};
sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));


