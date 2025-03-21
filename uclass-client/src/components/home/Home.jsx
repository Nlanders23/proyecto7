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
  const handleClick = () => {
    navigate('/catalogo-de-productos')
  }
  
  return (
    <>
      <div className="home-container">
        {/* Hero Slider */}
        <div className="slider-container">
          {sliderImages.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slider-image ${index === currentIndex ? (isTransitioning ? 'fade-out' : 'fade-in') : 'fade-out'}`}
              style={{ backgroundImage: `url(${slide.url})`, display: index === currentIndex ? 'flex' : 'none' }}
            >
              <div className="slider-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button className="shop-now-btn" onClick={handleClick}>COMPRAR AHORA</button>
              </div>
            </div>
          ))}

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
      </div>
    </>
  )
}

export default Home