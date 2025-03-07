import { Box, Button, Chip, Container, Divider, Grid2, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../Context/Users/UserContext';

const ClothSingle = () => {
  const location = useLocation();
  const cloth = location.state?.cloth;
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const {editCart, cart = [] } = userCtx;

  useEffect(() => {
    console.log("UserContext in ClothSingle:", userCtx);
    console.log("Current cloth:", cloth);
  }, [userCtx, cloth]);

  const formatCLP = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleAddToCart = () => {
    console.log('Añadir al carro:', cloth)
    if (!userCtx || !userCtx.editCart) {
      console.error("editCart function not available in UserContext");
      return;
    }
    
    const cart = userCtx.cart || [];
    console.log("Current cart before adding:", cart);
    
    const existingItem = cart.find(item => item.id === cloth._id);

    if(existingItem) {
      console.log("Item exists in cart, updating quantity");
      const updatedCart = cart.map(item => 
        item.id === cloth._id 
        ? { ...item, quantity: item.quantity +1 }
        : item
      );
      userCtx.editCart(updatedCart);
      console.log('Actualizar carro:', updatedCart)
    } else {
      const newItem = {
        id: cloth._id,
        priceID: cloth._id,
        name: cloth.name,
        price: cloth.price,
        img: cloth.img && cloth.img.length > 0 ? cloth.img[0] : '',
        size: cloth.size && cloth.sizes.length > 0
        ? cloth.sizes.map(s => s.name).join(',')
        : 'Talla única',
        quantity: 1,
        slug: cloth.name.toLowerCase().replace(/ /g, '-')
      };
      const newCart = [...cart, newItem];
      userCtx.editCart(newCart);
      console.log("New cart:", newCart);
    }

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
                {cloth.sizes.map((sizeObj, index) => (
                  <Chip
                    key={index}
                    label={sizeObj.size}
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
              <strong>Tallas:</strong> {cloth.size || 'Talla única'}
            </Typography>
          )}

          <Typography variant='body1' sx={{ color: '#333', marginBottom: '20px' }}>
            <strong>Categoria:</strong> {cloth.category || 'General'}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: '20px', width: '100%' }}
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ClothSingle