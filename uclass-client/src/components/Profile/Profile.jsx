import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/Users/UserContext';
import { Avatar, Box, Button, CircularProgress, Container, Divider, Grid2, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
       console.log('Verificando  autenticación')
      
      
       if(authStatus) {
         console.log('Estas Autenticado')
         setLoading(false);
         return;
       }

       const authResult = await verifyingToken();
       console.log("Resultado de la verificación", authResult);
      

       if (!authStatus) {
         console.log('usuario no autenticado, redireccionando a login')
         setAuthError(true);
         navigate('/iniciar-sesión');
        }
      } catch (error) {
        console.error('Error durante la autenticación', error);
        setAuthError(true)
      } finally {
        setLoading(false);
      }
        
   };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Cargando perfil...</Typography>
      </Box>
    );
  }

  if (authError || authStatus === false) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error de autenticación
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/iniciar-sesion')}
          sx={{ mt: 2 }}
        >
          Iniciar sesión
        </Button>
      </Box>
    );
  }

  if (authStatus && (!user || !user.username)) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#dce3f1', minHeight: '80vh' }}>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12} md={4}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Información de usuario no disponible
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => window.location.reload()}
                sx={{ mt: 2 }}
              >
                Recargar página
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    );
  }

  return (
    <>
    <Container disableGutters maxWidth="false" sx={{ py: 4, backgroundColor: '#dce3f1', minHeight: '80vh' }}>
      <Grid2 container justifyContent="center">
        <Grid2 item xs={12} md={4}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Avatar 
            alt={user?.username || 'Usuario'} 
            src="/static/images/avatar/1.jpg" 
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2, 
              border: '4px solid #1976d2' 
            }} 
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {user?.username || 'Usuario'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
              {user?.email || 'Correo no disponible'}
            </Typography>  
            <Divider sx={{ width: '100%', my: 2 }}/>
            <List sx={{ width: '100%' }}> 
              <ListItem>
                <ListItemText primary="Usuario desde" secondary="Abril 2024">
                </ListItemText>
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
               variant="contained" 
               onClick={() => navigate('/catalogo-de-productos')}
              >
                Explorar Productos
              </Button>
            </Box>
        </Paper>
        </Grid2>
      </Grid2>
    </Container>
    </>
  )
}

export default Profile