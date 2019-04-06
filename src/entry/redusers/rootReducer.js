import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import { sessionReducer } from 'redux-react-session';
import {historyMessages} from './historyMessages'
export const rootReducer = combineReducers({
    routing: routerReducer,
    session:sessionReducer,
    historyMessages:historyMessages
});
