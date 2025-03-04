import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/Users/UserContext'
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const userCtx = useContext(UserContext);
    
    const {authStatus, verifyingToken} = userCtx

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verify = async () => {
            await verifyingToken();
            setLoading(false);
        };
        verify();
    }, [verifyingToken])

  return (
    <Route 
        {...rest}
        element={
            loading? null : authStatus ? (
                <Component />
            ) : (<Navigate to='/' replace />)
        }
     />
  )
}

export default PrivateRoute