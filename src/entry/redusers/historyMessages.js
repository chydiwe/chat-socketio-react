import {endHistory, setHistory} from '../actions/getHistory'

const initialState = false;

export function historyMessages(state = initialState, action) {
    switch (action.type) {
        case setHistory : {
            return action.payload
        }
        case endHistory: {
            return action.payload
        }
        default:
            return state
    }
}