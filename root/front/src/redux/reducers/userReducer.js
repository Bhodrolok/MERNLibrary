import { EDIT_PROFILE, LOGIN, LOGOUT, REGISTER, SET_OTHERS , UPDATE_USER ,DELETE_USER, ADD_FAV, DELETE_FAV } from "../actions/type"

const initialState = {
    isAuthenticated: false,
    user: {},
    others: []
}


export default function(state = initialState , action){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        // case REGISTER:
        //     return {
        //         ...state,
        //     }
        case EDIT_PROFILE:
            return {
                ...state
            }
        case SET_OTHERS:
            return {
                ...state,
                others: [...action.payload]
            }
        case UPDATE_USER:
            return {
                ...state,
                others: state.others.map(item => item.id == action.payload.id? {...item ,...action.payload}: item)
            }
        case DELETE_USER:
            console.log(action.payload.id)
            return {
                ...state,
                others: state.others.filter(item => item._id != action.payload.id)
            }
        case ADD_FAV:
            console.log(action.payload.id)
            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: state.user.favourites.concat( action.payload.id)
                }
            }
        case DELETE_FAV:
            console.log(action.payload.id)
            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: state.user.favourites.filter(item => item != action.payload.id)
                }
            }
        case DELETE_FAV:
            console.log(action.payload.id)
            return {
                ...state,
                isLoading: false,
                others: state.others.filter(item => item._id != action.payload.id)
            }
        default:
            return state

    }
    return state;
}
