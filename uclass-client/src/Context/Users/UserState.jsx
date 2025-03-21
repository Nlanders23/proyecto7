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
        sessionURL: null,
        checkoutStatus: null
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
            });
            return res;
        } catch (error) {
            console.log(error);
            throw error;
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
        localStorage.removeItem('cart');
       dispatch({
        type: "CERRAR_SESION"
       }) 
    }

    const editCart = (cartItems) => {
        console.log("editCart called with:", cartItems);
       if(JSON.stringify(globalState.cart) !== JSON.stringify(cartItems)) {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error("Error saving cart to localStorage:", e);
        }
       }
        
        dispatch({
            type: 'ACTUALIZAR_CARRITO',
            payload: cartItems
        })
    }

    const setCheckoutStatus = (status) => {
        dispatch({
            type: 'ESTABLECER_CHECKOUT_STATUS',
            payload: status
        });
    }

    const getCheckoutSession = async () => {
        try {
          console.log("Creando checkout session with items:", globalState.cart);
          if (!globalState.cart || globalState.cart.length === 0) {
            console.error("El carro está vacío");
            return null;
          }
          
          const res = await axiosClient.post('/carts/create-order', { 
            items: globalState.cart 
          });
      
          console.log("Checkout session response:", res.data);
      
          if (res.data && res.data.url) {
            if (res.data.url.includes('canceled') || res.data.url.includes('cancel')) {
                setCheckoutStatus('canceled');
                return '/compra-cancelada';
            }

            dispatch({
              type: "ESTABLECER_SESSION_URL",
              payload: res.data.url
            });
            setCheckoutStatus('pending');
            return res.data.url;
          } else {
            console.log("No URL returned, simulating success");
            setCheckoutStatus('success');
             return '/compra-exitosa';
          }
          
        } catch (error) {
          console.log("Error creating checkout session:", error);
          if (error.response) {
            console.log("Error response data:", error.response.data);
            console.log("Error response status:", error.response.status);
          }
          setCheckoutStatus('canceled');
          return '/compra-cancelada';
        }
    }

    const handleCancelCheckout = () => {
        setCheckoutStatus('canceled');
        return '/compra-cancelada';
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
        getCheckoutSession,
        handleCancelCheckout,
        setCheckoutStatus
    }}>
        {props.children}
    </UserContext.Provider>
  )
};

export default UserState