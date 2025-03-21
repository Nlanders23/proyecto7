import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/Users/UserContext';
import { Box, Typography, Paper, Button, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Successful = () => {
  const { editCart } = useContext(UserContext);
  const [hasCleared, setHasCleared] = useState(false)
  
  
  useEffect(() => {
    if (!hasCleared) {
      console.log("Successful component mounted - clearing cart");
    editCart([]);
    setHasCleared(true);
    }  
  }, [editCart]);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 2, width: '100%', textAlign: 'center' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            ¡Compra Realizada con Éxito!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Gracias por tu compra. Hemos recibido tu pedido y está siendo procesado.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              component={Link} 
              to="/catalogo-de-productos" 
              variant="contained" 
              color="primary"
              sx={{ mr: 2 }}
            >
              Seguir Comprando
            </Button>
            <Button
              component={Link}
              to="/perfil"
              variant="outlined"
            >
              Ver Mi Perfil
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Successful;