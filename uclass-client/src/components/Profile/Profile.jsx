import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/Users/UserContext';
import { Avatar, Box, Button, CircularProgress, Container, Divider, Grid2, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      await verifyingToken();

      if (!authStatus) {
        navigate('/iniciar-sesión');
      }
      setLoading(false);
    };
    checkAuth();
  }, [authStatus, verifyingToken, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!authStatus) return null;

  return (
    <>
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#dce3f1', minHeight: '80vh' }}>
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} md={4}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar 
            alt={user.username} 
            src="/static/images/avatar/1.jpg" 
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2, 
              border: '4px solid #1976d2' 
            }} 
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
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