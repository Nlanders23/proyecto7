import React, { useContext, useEffect, useState } from 'react'
import ClothsContext from '../../Context/Cloths/ClothsContext'

const ClothList = () => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null)

  const ctx = useContext(ClothsContext);
  const {clothes, getCloths} = ctx;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getCloths();
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las prendas');
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
    
  }, [])
  
  if (loading) return <p>Cargando prendas...</p>;
  if (error) return <p>{error}</p>;
  if (!cloths || cloths.length === 0) return <p>No hay prendas disponibles.</p>;

  return (
    <div className="cloth-list-container">
      <h1>Catalogo de Prendas</h1>
      <div className="cloth-grid">
        {cloths.map(cloth => (
          <div key={cloth._id} className="cloth-card">
            <h2>{cloth.name}</h2>
            <p>Precio: ${cloth.price}</p>
            {cloth.img && cloth.img.length > 0 && (
              <img src={cloth.img[0]} alt={cloth.name} className="cloth-image" />
            )}
            {cloth.description && <p>{cloth.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClothList