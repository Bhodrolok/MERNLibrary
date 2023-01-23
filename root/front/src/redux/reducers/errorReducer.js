import { CLEAR_ERROR, SET_ERROR } from "../actions/type"

const initialState = {
    isValid: true,
    error: {}
}


export default function(state = initialState , action){
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                isValid: false,
                error: {...action.payload}
            }
        case CLEAR_ERROR:
            return {
                ...state,
                isValid: true,
                error: {}
            }
        default:
            return state

    }
    return state;
}
