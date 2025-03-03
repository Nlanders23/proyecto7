import React, { useReducer } from 'react'
import ClothsContext from './ClothsContext'
import ClothsReducer from './ClothsReducer'
import axiosClient from '../../config/axios'

const ClothsState = (props) => {
    const initialState = {
        clothes: [],
        currentCloth: {
            _id: null,
            name: "",
            price: "",
            description: "",
            size: "",
            image: "",
            category: ""
        }
    }

    const [globalState, dispatch] = useReducer(ClothsReducer, initialState)

    const getCloths = async () => {
        try {
            const res = await axiosClient.get('/cloth/get-all-clothes')
            console.log("API Response:", res.data)
            if (res.data && res.data.clothes && Array.isArray(res.data.cloths)) {
                dispatch({
                    type: "OBTENER_PRENDAS",
                    payload: res.data.clothes
                })
            } else {
                console.error("Invalid response format:", res.data)
            }
        } catch (error) {
            console.error("Error fetching clothes:", error)
        }
    }

    const getCloth = async (id) => {
        try {
            const res = await axiosClient.get(`/cloth/get-cloth/${id}`)
            dispatch({
                type: "OBTENER_PRENDA",
                payload: res.data.clothes
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ClothsContext.Provider
            value={{
                clothes: globalState.clothes,
                currentCloth: globalState.currentCloth,
                getCloths,
                getCloth
            }}
        >
            {props.children}
        </ClothsContext.Provider>
    )
}

export default ClothsState