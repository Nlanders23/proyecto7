import React, { useReducer } from 'react'
import ClothsContext from './ClothsContext'
import ClothsReducer from './ClothsReducer'
import axiosClient from '../../config/axios'

const ClothsState = (props) => {
    const initialState = {
        cloths: []
    }

    const [globalState, dispatch] = useReducer(ClothsReducer, initialState)

    const getCloths = async () => {
        try {
            const res = await axiosClient.get('/cloth/get-all-clothes')
            dispatch({
                type: "OBTENER_PRENDAS",
                payload: res.data.cloths
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ClothsContext.Provider
            value={{
                cloths: globalState.cloths,
                getCloths
            }}
        >
            {props.children}
        </ClothsContext.Provider>
    )
}

export default ClothsState