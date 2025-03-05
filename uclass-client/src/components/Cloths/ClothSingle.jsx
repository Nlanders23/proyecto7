import { Box, Button, Chip, Container, Divider, Grid2, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ClothSingle = () => {
  const location = useLocation();
  const cloth = location.state?.cloth;
  const formatCLP = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const navigate = useNavigate();
  const handleClick =() => {
    navigate('/carrito')
  }

  return (
    <Container maxWidth="lg" className='detalles' sx={{ padding: '80px 20px', backgroundColor: '#dce3f1' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        <Box sx={{
          flex: '1',
          textAlign: 'center',
          minWidth: { md: '45%' }
        }}>
          <Typography variant='h4' gutterBottom sx={{ paddingBottom: '10px', color: '#333' }}>
            {cloth.name}
          </Typography>
          <img
            src={cloth.img && cloth.img.length > 0 ? cloth.img[0] : ''}
            alt={cloth.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              objectFit: 'contain'
            }}
          />
        </Box>

        <Box sx={{
          flex: '1',
          minWidth: { md: '45%' },
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          padding: '25px'
        }}>
          <Typography variant='body1' sx={{ fontSize: '24px', fontWeight: 700, color: '#ff5722', marginBottom: '25px' }}>
            <strong>Precio:</strong> {formatCLP(cloth.price)}
          </Typography>

          <Divider sx={{ marginBottom: '20px' }} />

          <Typography variant='h6' sx={{ marginBottom: '15px', color: '#333' }}>
            Detalles del Producto
          </Typography>

          <Typography variant='body1' sx={{ color: '#333', marginBottom: '20px', lineHeight: '1.6' }}>
            <strong>Descripción:</strong> {cloth.description}
          </Typography>

          {cloth.sizes && cloth.sizes.length > 0 ? (
            <>
              <Typography variant='body1' sx={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
                Tallas Disponibles:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {cloth.sizes.map((size, index) => (
                  <Chip
                    key={index}
                    label={size.size}
                    variant="outlined"
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      fontWeight: 'bold'
                    }}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Typography variant='body1' sx={{ color: '#333', marginBottom: '20px' }}>
              <strong>Tallas:</strong> {cloth.size}
            </Typography>
          )}

          <Typography variant='body1' sx={{ color: '#333', marginBottom: '20px' }}>
            <strong>Categoria:</strong> {cloth.category}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: '20px', width: '100%' }}
            startIcon={<ShoppingCartIcon />}
            onClick={handleClick}
          >
            Añadir al Carrito
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ClothSingle