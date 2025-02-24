import React, { useReducer } from 'react'
import ClothsContext from './ClothsContext'
import ClothsReducer from './ClothsReducer'

const ClothsState = (props) => {
    const initialState = {
        cloths: [
            {
                id: 0,
                name: 'Polera deportiva Under Armor',
                price: 9990,
                description: 'Polera de algodón sin mangas ideal para actividades deportivas',
                item: 'Polera',
                size: 'M'
            }
        ]
    }

    const [globalState, dispatch] = useReducer(ClothsReducer, initialState)

    return (
        <ClothsContext.Provider
            value={{
                cloths: globalState.cloths
            }}
        >
            {props.children}
        </ClothsContext.Provider>
    )
}

export default ClothsState