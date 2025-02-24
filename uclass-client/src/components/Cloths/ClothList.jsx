import React, { useContext } from 'react'
import ClothsContext from '../../Context/Cloths/ClothsContext'

const ClothList = () => {
  const ctx = useContext(ClothsContext);
  const {cloths} = ctx;
  return (
    <div>
      Esta es la lista de Prendas
        {cloths.map(cloth => {
          return (
            <div key={cloth.id}>
              <h1>{cloth.name}</h1>
              <p>{cloth.price}</p>
            </div>
          )
        })}
      </div>
  )
}

export default ClothList