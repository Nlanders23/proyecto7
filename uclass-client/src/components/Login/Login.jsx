import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/Users/UserContext'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const {
    loginUser,
    authStatus,
    verifyingToken
  } = userCtx;

  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    verifyingToken();

    if (authStatus) {
      navigate('/perfil');
    }
  }, [authStatus])

  if (authStatus) return null

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const sendData = async (event) => {
    event.preventDefault();
    try {
      const resp = await loginUser(data);
      if (resp && resp.status === 200) {
        setError(null)
      } else {
        setError('Credenciales inválidas')
      }
    } catch (error) {
      console.log("error en sendData")
      setError('Error al iniciar sesión')
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#333', fontWeight: '600', fontSize: '24px', marginBottom: '10px' }}>
              Iniciar sesión
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>Ingresa tus credenciales para acceder.</p>
          </div>
          <form onSubmit={(e) => { sendData(e) }}>
            <input type="hidden" name="remember" value="true" />
            <div style={{ padding: '0 20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label for="username" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Tu Usuario</label>
                <input
                  id="username"
                  onChange={(e) => { handleChange(e) }}
                  name="username" type="text" autocomplete="username" required placeholder="Tu usuario"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label for="password" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Contraseña</label>

                <input id="password"
                  name="password"
                  onChange={(e) => { handleChange(e) }}
                  type="password" autocomplete="current-password"
                  required
                  placeholder="Password" 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                  }}
                  />
              </div>
            </div>
            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <Button
                variant='contained'
                endIcon={<SendIcon />}
                type="submit"
                style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                Comenzar
              </Button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login