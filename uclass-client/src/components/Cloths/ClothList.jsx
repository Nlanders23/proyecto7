import React, { useContext, useEffect, useState } from 'react'
import ClothsContext from '../../Context/Cloths/ClothsContext'

const ClothList = () => {
  const [cloth, setCloth] = useState({
    name: '',
    price: '',
    description: '',
    item: '',
    size: ''
  })

  const [error, setError] = useState(null)

  const ctx = useContext(ClothsContext);
  const {cloths, 
    getCloths
  } = ctx;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCloths();
      } catch (error) {
        setError('Error al cargar las prendas');
        console.error(error);
      }
    };
    fetchData();
    
  }, [getCloths])

  return (
    <div>
      <h1>Esta es la lista de Prendas</h1>
        {cloths.map(cloth => {
          return (
            <div key={cloth._id}>
              <h2>{cloth.name}</h2>
              <p>Precio: ${cloth.price}</p>
            </div>
          )
        })}
      </div>
  )
}

export default ClothList