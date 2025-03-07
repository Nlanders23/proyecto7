import React from 'react'

const UserReducer = (globalState, action) => {
    switch (action.type) {
        case "LOGIN_EXITOSO":
        case "REGISTRO_EXITOSO":
            localStorage.setItem('token', action.payload)

            return {
                ...globalState,
                authStatus: true
            };
        case "OBTENER_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                user: action.payload
            }
        case "VERIFICACION_FALLIDA":
            localStorage.removeItem('token');
            return {
                ...globalState,
                user: {
                    username: null,
                    email: null,
                },
                authStatus: false,
                loading: false
            }
        case "CERRAR_SESION":
            localStorage.removeItem('token');
            return {
                ...globalState,
                user: null,
                authStatus: null,
                loading: false
            }
            case "ACTUALIZAR_CARRITO":
                console.log("ACTUALIZAR_CARRITO action called with payload:", action.payload);
                return {
                    ...globalState,
                    cart: action.payload
                };
        case "ESTABLECER_SESSION_URL":
            return {
                ...globalState,
                sessionURL: action.payload
            }
        default:
            return globalState;
    }
}

export default UserReducer