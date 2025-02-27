import React, { useContext, useState } from 'react'
import UserContext from '../../Context/Users/UserContext'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { regiserUser, authStatus, verifyingToken } = userCtx;

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    genre: "",
    age: ""
  });

  useEffect(() => {
      verifyingToken();
  
      if (authStatus) {
       navigate('/perfil');
      }
    }, [authStatus])
  
    if (authStatus) return null

  const handleChange = (event) => {
    event.preventDefault();
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  };

  const sendData =(event) => {
    event.preventDefault();
    regiserUser(data)
  }

  return (
    <>

      <div>
        <div>
          <h2>
            Crear cuenta
          </h2>
        </div>

        <div>
          <div>
            <form onSubmit={(e) => { sendData(e) }}>
              <div>
                <label htmlFor="email">
                  Nombre de usuario
                </label>
                <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    onChange={(e) => { handleChange(e) }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email">
                  Email
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => { handleChange(e) }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">
                  Contraseña
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => { handleChange(e) }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="genre">
                  Género
                </label>
                <div>
                  <input
                    id="genre"
                    name="genre"
                    type="text"
                    required
                    onChange={(e) => { handleChange(e) }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="age">
                  Edad
                </label>
                <div>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    onChange={(e) => { handleChange(e) }}
                  />
                </div>
              </div>

              <div>
                <button type="submit">
                  Registrarme
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Register