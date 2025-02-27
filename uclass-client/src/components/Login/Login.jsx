import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/Users/UserContext'
import {useNavigate} from 'react-router-dom'

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
      if( resp && resp.status === 200) {
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
      <div>
        <div>
          <div>
            <h2>
              Iniciar sesión
            </h2>
          </div>
          <form onSubmit={(e) => { sendData(e) }}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <div>
                <label for="username">Tu Usuario</label>
                <input
                  id="username"
                  onChange={(e) => { handleChange(e) }}
                  name="username" type="username" autocomplete="username" required placeholder="Tu usuario" />
              </div>
              <div>
                <label for="password">Contraseña</label>

                <input id="password"
                  name="password"
                  onChange={(e) => { handleChange(e) }}
                  type="password" autocomplete="current-password"
                  required
                  placeholder="Password" />
              </div>
            </div>
            {error}
            <div>
              <button type="submit">
                Comenzar
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default Login