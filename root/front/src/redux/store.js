import {createStore , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = devTools ? createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        devTools
    )
):createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
)

export {store}
