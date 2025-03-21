import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/Users/UserContext';
import { Box, Typography, Paper, Button, Container } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Canceled = () => {
  const { cart } = useContext(UserContext);
  
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 2, width: '100%', textAlign: 'center' }}>
          <CancelIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Compra Cancelada
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Tu proceso de compra ha sido cancelado. Los productos siguen disponibles en tu carrito si deseas completar la compra más tarde.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              component={Link} 
              to="/carrito" 
              variant="contained" 
              color="primary"
              sx={{ mr: 2 }}
            >
              Volver al Carrito
            </Button>
            <Button
              component={Link}
              to="/catalogo-de-productos"
              variant="outlined"
            >
              Seguir Comprando
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Canceled;