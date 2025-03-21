import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../Context/Users/UserContext'
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Select, MenuItem, Button, Paper, Divider, Alert, Grid2} from '@mui/material';

const Checkout = () => {
  const userCtx = useContext(UserContext);
  const { cart = [], sessionURL, getCheckoutSession, editCart } = userCtx;
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UserContext in Checkout:", userCtx);
    console.log("Cart in Checkout:", cart);
    console.log("Cart from localStorage:", JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [userCtx, cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Submitting cart for checkout:", cart);
      const url = await getCheckoutSession();

      if (process.env.NODE_ENV === 'development' && !url) {
        console.log("Development mode - simulating successful checkout");
        setIsLoading(false);
        navigate('/compra-exitosa');
        return;
      }

      if (url) {
        window.location.href = url;
      } else {
        navigate('/compra-exitosa');
      }

    } catch (error) {
      console.error("Checkout error:", error);
      setError(`Error al procesar el pago: ${error.message || "Inténtalo de nuevo."}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionURL) {
      console.log("Redireccionando:", sessionURL);
      if (sessionURL.includes('/compra-exitosa')) {
        navigate(sessionURL);
      } else {
        window.location.href = sessionURL;
      }
    }
  }, [sessionURL, navigate]);

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      if (!cart || cart.length === 0) return 0;

      return cart.reduce((acc, cv) => {
        const updateQuantity = cv.price * cv.quantity;
        return updateQuantity + acc;
      }, 0);
    };

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder();
      setTotal(total);
    };

    getOrderDetails();
  }, [cart]);

  const handleChange = (e) => {
    if (!cart || cart.length === 0) return;

    const priceID = e.target.name;
    const newQuantity = parseInt(e.target.value);

    const updatedCart = cart.map((item) => {
      return item.priceID === priceID
        ? {
          ...item,
          quantity: newQuantity
        }
        : item;
    });
    editCart(updatedCart);
  };

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault();
    if (!cart || cart.length === 0) return;

    const updatedCart = cart.filter((item) => {
      return item.priceID !== currentPriceID;
    });
    editCart(updatedCart);
  };

  useEffect(() => {
    console.log("Current cart:", cart);
  }, [cart]);

  const formatCLP = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  if (!cart || cart.length === 0) {
    console.log("Cart is empty in render condition");
    return (
      <div className="max-w-4xl mx-4 py-8 md:mx-auto text-center">
        <h1 className="text-3xl font-bold mt-8">Carrito</h1>
        <p className="mt-4">Tu carrito está vacío</p>
        <div className="mt-4">
          <Link to="/catalogo-de-productos" className="underline text-blue-500">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrito de Compras
        </Typography>

        <List sx={{ width: '100%' }}>
          {cart.map((e) => (
            <ListItem key={e.id || e.priceID} alignItems="flex-start" sx={{ py: 3, borderBottom: '1px solid #eee' }}>
              <Grid2 container spacing={2} alignItems='center'>
                <Grid2 item xs={12} sm={3}>
                  <ListItemAvatar>
                    <Avatar src={e.img} alt={e.name} sx={{ width: 60, height: 60 }} />
                  </ListItemAvatar>
                </Grid2>

                <Grid2 item xs={12} sm={6}>
                  <ListItemText
                    primary={
                      <Link to={`/catalogo-de-productos/${e.slug || e.name}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {e.name}
                      </Link>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" color="text.secondary">
                          {e.size || 'Estándar'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Select
                            labelId={`quantity-${e.id || e.priceID}-label`}
                            id={`quantity-${e.id || e.priceID}`}
                            value={e.quantity}
                            name={e.priceID}
                            onChange={(evt) => handleChange(evt, e.priceID)}
                            sx={{ mr: 2, height: 36 }}
                          >
                            {Array(5)
                              .fill(null)
                              .map((_, i) => {
                                const initial = i + 1;
                                return (
                                  <MenuItem key={initial} value={initial}>
                                    {initial}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                          <Button
                            variant="text"
                            color="error"
                            onClick={(evt) => handleRemove(evt, e.priceID)}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </Grid2>
                <Grid2 item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle1" sx={{ ml: 2 }}>
                    {formatCLP(e.price * e.quantity)}
                  </Typography>
                </Grid2>
              </Grid2>
            </ListItem>
          ))}
        </List>

        <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resumen del Pedido
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">{formatCLP(total)}</Typography>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Procesar Pago'}
        </Button>
      </Box>
    </>
  )
}

export default Checkout