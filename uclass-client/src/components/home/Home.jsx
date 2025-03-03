import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const sliderImages = [
    {
      id: 1,
      url: '/zapatillas-deportivas.png',
      alt: 'Colección de zapatillas deportivas',
      title: 'NUEVA COLECCIÓN DE ZAPATILLAS',
      subtitle: 'Rendimiento y estilo para tus entrenamientos'
    },
    {
      id: 2,
      url: '/equipamiento-fitnes.png',
      alt: 'Ropa para fitness',
      title: 'EQUIPAMIENTO FITNESS',
      subtitle: 'La mejor tecnología para tu entrenamiento'
    },
    {
      id: 3,
      url: '/coleccion-running.png',
      alt: 'Colección para running',
      title: 'COLECCIÓN RUNNING',
      subtitle: 'Diseñada para batir tus récords personales'
    },
    {
      id: 4,
      url: '/equipamiento-deportes-de-equipo.png',
      alt: 'Equipamiento para deportes de equipo',
      title: 'DEPORTES DE EQUIPO',
      subtitle: 'Equipamiento profesional para tus partidos'
    },
    {
      id: 5,
      url: '/accesorios-deportivos.png',
      alt: 'Accesorios deportivos',
      title: 'ACCESORIOS',
      subtitle: 'Complementa tu equipamiento deportivo'
    },
    {
      id: 6,
      url: '/ropa-outdoor.png',
      alt: 'Ropa outdoor',
      title: 'COLECCIÓN OUTDOOR',
      subtitle: 'Preparado para cualquier aventura'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1));
      setIsTransitioning(false);
    }, 500); 
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1));
      setIsTransitioning(false);
    }, 500); 
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500); 
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const navigate = useNavigate();
  const handleClick =() => {
    navigate('/catalogo-de-productos')
  }

  const featuredProducts = [
    {
      id: 1,
      name: 'Zapatillas Running Pro',
      price: 129990,
      image: '/zapatillas-running-pro.png',
      category: 'running'
    },
    {
      id: 2,
      name: 'Camiseta Técnica UltraLight',
      price: 25990,
      image: '/images/product2.jpg',
      category: 'fitness'
    },
    {
      id: 3,
      name: 'Shorts de entrenamiento FlexFit',
      price: 14990,
      image: '/images/product3.jpg',
      category: 'training'
    },
    {
      id: 4,
      name: 'Chaqueta Impermeable OutdoorPro',
      price: 89990,
      image: '/images/product4.jpg',
      category: 'outdoor'
    }
  ];
  
  return (
    <>
        <div className="home-container">
      {/* Hero Slider */}
      <div className="slider-container">
        <div 
          className={`slider-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          style={{ backgroundImage: `url(${sliderImages[currentIndex].url})` }}
        >
          <div className="slider-content">
            <h2>{sliderImages[currentIndex].title}</h2>
            <p>{sliderImages[currentIndex].subtitle}</p>
            <button className="shop-now-btn" onClick={handleClick}>COMPRAR AHORA</button>
          </div>
        </div>

        {/* Controles del slider */}
        <button className="slider-control prev-btn" onClick={prevSlide}>&#10094;</button>
        <button className="slider-control next-btn" onClick={nextSlide}>&#10095;</button>
        
        {/* Indicadores */}
        <div className="slider-indicators">
          {sliderImages.map((_, index) => (
            <button 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Productos destacados */}
      <section className="featured-products">
        <div className="section-title">
          <h2>PRODUCTOS DESTACADOS</h2>
          <p>Las mejores opciones seleccionadas para ti</p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-badge">Destacado</div>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
              <div className="product-actions">
                <button className="add-to-cart">Añadir al carrito</button>
                <button className="quick-view">Vista rápida</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-container">
          <a href="/products" className="view-all-btn">Ver todos los productos</a>
        </div>
      </section>

      {/* Banner promocional */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>HASTA 40% DE DESCUENTO</h2>
          <p>En nuestra nueva colección de verano</p>
          <button className="promo-btn">Ver ofertas</button>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home