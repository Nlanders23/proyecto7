import React from 'react'

const Category = () => {

    const categories = [
        { id: 1, name: 'Running', image: '/running.png' },
        { id: 2, name: 'Fitness', image: '/fitness.png' },
        { id: 3, name: 'Fútbol', image: '/futbol.png' },
        { id: 4, name: 'Básquetbol', image: '/baloncesto.png' },
        { id: 5, name: 'Outdoor', image: '/outdoor.png' },
        { id: 6, name: 'Natación', image: '/natacion.png' }
      ];

  return (
      <section className="categories-section">
        <div className="section-title">
          <h2>CATEGORÍAS DESTACADAS</h2>
          <p>Encuentra todo lo que necesitas para tu deporte favorito</p>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
              <a href={`/categoria/${category.name.toLowerCase()}`} className="category-link">
                Ver productos
              </a>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Category