import {endHistory, setHistroy} from '../actions/getHistory'

const initialState = false;

export function historyMessages(state = initialState, action) {
    switch (action.type) {
        case setHistroy : {
            return action.payload
        }
        case endHistory: {
            return action.payload
        }
        default:
            return state
    }
}