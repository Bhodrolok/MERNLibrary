import { ADD_COMMENT, ALL_BOOK, CREATE_BOOK, DELETE_BOOK, DEL_COMMENT, RETRIEVE_BOOK, UPDATE_BOOK} from "../actions/type"

const initialState = {
    isLoading: false,
    books: []
}


export default function(state = initialState , action){
    switch(action.type){
        case ALL_BOOK:
            return {
                ...state,
                isLoading: false,
                books:[...action.payload]
            }
        case CREATE_BOOK:
            return {
                ...state,
                isLoading: false,
                books: state.books.concat(action.payload)
            }
        case RETRIEVE_BOOK:
            return {
                ...state,
                isLoading: false,
                books: state.books.filter(item => item.id == action.payload.id)
            }
        case UPDATE_BOOK:
            return {
                ...state,
                isLoading: false,
                books: state.books.map(item => item.id == action.payload.id? {...item ,...action.payload}: item)
            }
        case DELETE_BOOK:
            console.log(action.payload.id)
            return {
                ...state,
                isLoading: false,
                books: state.books.filter(item => item._id != action.payload.id)
            }
        case ADD_COMMENT:
            console.log(action.payload)
            return {
                ...state,
                books: state.books.map(item => item._id == action.payload.id ?
                    {...item , comments:[...item.comments, 
                        {comment:action.payload.comment, email:action.payload.email, postedDate:action.payload.postedDate} ]
                    }
                    :
                    item
                    )
            }

        default:
            return state

    }
    return state;
}
