import React, { useContext, useEffect, useState } from 'react'
import ClothsContext from '../../Context/Cloths/ClothsContext'
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ClothList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const ctx = useContext(ClothsContext);
  const { clothes, getCloths } = ctx;

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

  if (loading) {
    return (
      <Grid2
        container
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '100vh' }}
      >
        <CircularProgress />
        <p>Cargando prendas...</p>
      </Grid2>
    )
  }
  if (error) return <p>{error}</p>;
  if (!clothes || clothes.length === 0) return <p>No hay prendas disponibles.</p>;

  const formatCLP = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  return (
    <Grid2 sx={{ backgroundColor: ' #dce3f1' }}>
      <Typography gutterBottom variant='h4'>Catalogo de Prendas</Typography>
      <Grid2 container spacing={2} sx={{ padding: '20px', backgroundColor: ' #dce3f1' }}>
        {clothes.map((cloth) => (
          <Grid2 item xs={12} sm={6} md={4} key={cloth._id}>
            <Card sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' } }}>
              <CardActionArea
                component={Link}
                to={`/catalogo-de-productos/${cloth.name}`}
                state={{ cloth }}
              >
                {cloth.img && cloth.img.length > 0 && (
                  <CardMedia
                    component='img'
                    height='250'
                    image={cloth.img[0]}
                    alt={cloth.name}
                    sx={{ objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.1)' } }}
                  />)}
                <CardContent sx={{ padding: '20px 20px 10px' }}>
                  <Typography gutterBottom variant='h6' sx={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px', color: '#333' }}>
                    {cloth.name}
                  </Typography>
                  <Typography gutterBottom variant='h10' sx={{ fontSize: '20px', fontWeight: 700, color: '#ff5722', marginBottom: '15px' }}>
                    Precio: {formatCLP(cloth.price)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
                    Ver producto
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))};
      </Grid2>
    </Grid2>

  )

}

export default ClothList