import React, { useReducer } from 'react'
import axiosClient from '../../config/axios'
import UserContext from './UserContext';
import UserReducer from './UserReducer';

const UserState = (props) => {
    const initialState = {
        user: {
            username: null,
            email: null,
        },
        authStatus: false,
        loading: true
    }

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = async (formData) => {
        try {
            const res = await axiosClient.post('/user/register', formData);
            const token = res.data.token;
            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: token
            })
        } catch (error) {
            console.log(error)
        }
    }

    const loginUser = async (formData) => {
        try {
            const res = await axiosClient.post('/user/login', formData);
            const token = res.data.token;
            dispatch({
                type: "LOGIN_EXITOSO",
                payload: token
            })
            return res;
        } catch (error) {
            console.log(error)
            return error.response;
        }
    }

    const verifyingToken = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization'] 
        }

        try {
            const res = await axiosClient.get('/user/verify-token')
            dispatch({
                type: "OBTENER_USUARIO",
                payload: res.data.user
            })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => { 
       dispatch({
        type: "CERRAR_SESION"
       }) 
    }

  return (
    <UserContext.Provider value={{
        user: globalState.user,
        authStatus: globalState.authStatus,
        loading: globalState.loading,
        registerUser,
        loginUser,
        verifyingToken,
        logout
    }}>
        {props.children}
    </UserContext.Provider>
  )
};

export default UserState