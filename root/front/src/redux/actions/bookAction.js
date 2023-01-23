import axios from "axios"
import { CREATE_BOOK, DELETE_BOOK, RETRIEVE_BOOK, UPDATE_BOOK , ALL_BOOK, CLEAR_ERROR, SET_ERROR, ADD_COMMENT } from "./type";

//Fetch all the available books in database collection
export const allBook = () => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.get('http://localhost:4000/book/')
        .then(res => {
            console.log(res.data);
            dispatch({type: ALL_BOOK , payload: res.data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

//Fetch a single book
export const retrieveBook = () => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.get('http://localhost:4000/book')
        .then(res => {
            console.log(res.data);
            dispatch({type: RETRIEVE_BOOK , payload: res.data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

//Create new book entry in collection
export const createBook = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post('http://localhost:4000/book/create-book' , {...data})
        .then(res => {
            dispatch({type: CREATE_BOOK , payload: res.data})
            navigate('/manage');
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

//Update existing book entry in collection
export const updateBook = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.put(`http://localhost:4000/book/update-book/${data.id}` , {...data})
        .then(res => {
            dispatch({type: UPDATE_BOOK , payload: res.data})
            navigate('/manage');
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

//Delete existing book entry from collection
export const deleteBook = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.delete(`http://localhost:4000/book/delete-book/${data.id}`)
    .then(res => {
            dispatch({type: DELETE_BOOK , payload: data})
            navigate('/manage');
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

//As loggedin user, make upto 1 comment under a book's profile/preview page
export const addComment = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post(`http://localhost:4000/book/add-comment`, {...data})
    .then(res => {
        console.log(data)
            dispatch({type: ADD_COMMENT , payload: data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });

}



