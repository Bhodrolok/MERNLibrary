import axios from "axios"
import { SET_ERROR, LOGIN, LOGOUT, CLEAR_ERROR, SET_OTHERS , UPDATE_USER , DELETE_USER, ADD_FAV, DELETE_FAV } from "./type";

export const signinUser = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR})
    axios.post('http://localhost:4000/user/signin' , {...data})
        .then(res => {
            console.log(res.data);
            // if (res.data.isAuthenticated){
                window.localStorage.setItem('isAuthenticated' , true)
                window.localStorage.setItem('_id' , res.data.user._id)
                window.localStorage.setItem('name' , res.data.user.name)
                window.localStorage.setItem('email' , res.data.user.email)
                window.localStorage.setItem('password' , res.data.user.password)
                window.localStorage.setItem('roll' , res.data.user.roll)
                window.localStorage.setItem('favourites' , res.data.user.favourites)

                console.log('sss');
                dispatch({type: LOGIN , payload: res.data.user})
                navigate('/profile');
            // }
        })
        .catch(err => {
            dispatch({type: SET_ERROR , payload: err.response.data})
        });
}

export const registerUser = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR})
    axios.post('http://localhost:4000/user/register' , {...data})
        .then(res => {
            navigate('/signin');
        })
        .catch(err => {
            dispatch({type: SET_ERROR , payload: err.response.data})
        });
}


export const allOthers = () => dispatch => {
    dispatch({type:CLEAR_ERROR})
    axios.get('http://localhost:4000/user/allOthers')
        .then(res => {
            dispatch({type: SET_OTHERS , payload: res.data.others})
        })
        .catch(err => {
            dispatch({type: SET_ERROR , payload: err.response.data})
        });
}


export const logoutUser = (navigate) => dispatch => {
            window.localStorage.removeItem('isAuthenticated')
            window.localStorage.removeItem('_id')
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('email')
            window.localStorage.removeItem('password' )
            window.localStorage.removeItem('roll')
            window.localStorage.removeItem('favourites')
            dispatch({type: LOGOUT})
            navigate('/signin');
}


export const updateUser = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.put(`http://localhost:4000/user/update-user/${data.id}` , {...data})
        .then(res => {
            dispatch({type: UPDATE_USER , payload: res.data})
            navigate('/manage');
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const deleteUser = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.delete(`http://localhost:4000/user/delete-user/${data.id}`)
    .then(res => {
            dispatch({type: DELETE_USER , payload: data})
            navigate.push('/manage');
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const addFav = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post(`http://localhost:4000/user/add-fav` , {...data})
    .then(res => {
            dispatch({type: ADD_FAV , payload: data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}
export const delFav = (data , navigate) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post(`http://localhost:4000/user/delete-fav` , {...data})
    .then(res => {
            dispatch({type: DELETE_FAV , payload: data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}
