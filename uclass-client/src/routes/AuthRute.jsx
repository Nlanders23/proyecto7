import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/Users/UserContext'
import { Navigate, Route } from 'react-router-dom';

const AuthRute = ({component: Component, ...props}) => {
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
    return (
        <Route 
        {...rest}
        element={
            loading? null : authStatus ? (
                <Component />
            ) : (<Navigate to='/perfil' replace />)
        }
     />
  )
}

export default AuthRute