import React, { useReducer } from 'react'
import axiosClient from '../../config/axios'
import UserContext from './UserContext';
import UserReducer from './UserReducer';

const UserState = (props) => {
    const savedCart = localStorage.getItem('cart');
    let parsedCart = [];
    
    try {
        parsedCart = savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
    }

    const initialState = {
        user: {
            username: null,
            email: null,
        },
        authStatus: false,
        loading: true,
        cart: parsedCart,
        sessionURL: null
    }
    console.log("Initial state in UserState:", initialState);

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
        if (!token) {
            console.log("Token no encontrado en localStorage");
            dispatch({
                type: "VERIFICACION_FALLIDA"
            });
            return false;  
        }
            
            try {
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                const res = await axiosClient.get('/user/verify-token');
                console.log("Token verificado");
                dispatch({
                    type: "OBTENER_USUARIO",
                    payload: res.data.user
                });
                return true;
            } catch (error) {
                delete axiosClient.defaults.headers.common['Authorization'];
                console.log("Verificación de token fallida:", error.message || error);
                dispatch({
                    type: "VERIFICACION_FALLIDA"
                });
                return false;
            }
        }

    const logout = () => { 
       dispatch({
        type: "CERRAR_SESION"
       }) 
    }

    const editCart = (cartItems) => {
        console.log("editCart called with:", cartItems);
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error("Error saving cart to localStorage:", e);
        }
        dispatch({
            type: 'ACTUALIZAR_CARRITO',
            payload: cartItems
        })
    }

    const getCheckoutSession = async () => {
        try {
            const res = await axiosClient.post('/carts/create-order', { 
                items: globalState.cart 
            });
            
            dispatch({
                type: "ESTABLECER_SESSION_URL",
                payload: res.data.url
            })
        } catch (error) {
            console.log("Error creating checkout session:", error);
        }
    }
  return (
    <UserContext.Provider value={{
        user: globalState.user,
        authStatus: globalState.authStatus,
        loading: globalState.loading,
        cart: globalState.cart,
        sessionURL: globalState.sessionURL,
        registerUser,
        loginUser,
        verifyingToken,
        logout,
        editCart,
        getCheckoutSession
    }}>
        {props.children}
    </UserContext.Provider>
  )
};

export default UserState