import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/Users/UserContext'
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const AuthRoute = ({children}) => {
  const userCtx = useContext(UserContext);
  const {authStatus, verifyingToken} = userCtx;
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const verify = async () => {
        await verifyingToken()
        setLoading(false)
    }
    verify();
  }, [verifyingToken])

   if(loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <CircularProgress />
            </Box>
          );
    }

  return authStatus ?  <Navigate to="/perfil" replace /> : children;
}

export default AuthRoute