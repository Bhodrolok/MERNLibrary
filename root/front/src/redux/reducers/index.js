import {combineReducers} from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    error: errorReducer
})

export default rootReducer;
