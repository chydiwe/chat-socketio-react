import {USER_ADD_SUCCES, USER_ADD_FAILED} from '../actions/userAPI'

const initialState = false;

export function userState(state = initialState, action) {
    switch (action.type) {
        case USER_ADD_SUCCES : {
            return action.payload
        }
        case USER_ADD_FAILED: {
            return action.payload
        }
        default:
            return state
    }
}