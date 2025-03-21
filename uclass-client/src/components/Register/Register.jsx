import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../Context/Users/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { registerUser, authStatus, verifyingToken } = userCtx;

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
      [event.target.name]: event.target.value
    })
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(data);
      if (!authStatus) {
        setError("Registro exitoso. Intente iniciar sesión.");
      }
    } catch (error) {
      setError("Error al registrar: " + (error.message || "Intente nuevamente"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#333', fontWeight: '600', fontSize: '24px', marginBottom: '10px' }}>Crear cuenta</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>Completa el formulario para registrarte.</p>
          </div>

          <div>
            <div>
              <form onSubmit={(e) => { sendData(e) }}>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Nombre de usuario</label>
                    <div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '16px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Email</label>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '16px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Contraseña</label>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '16px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="genre" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Género</label>
                    <div>
                      <input
                        id="genre"
                        name="genre"
                        type="text"
                        required
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '16px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="age" style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Edad</label>
                    <div>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        required
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontSize: '16px',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        backgroundColor: isLoading ? '#cccccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      {isLoading ? 'Registrando...' : 'Registrarme'}
                    </button>

                    {error && (
                      <div style={{
                        color: 'red',
                        marginTop: '10px',
                        textAlign: 'center'
                      }}>
                        {error}
                      </div>
                    )};
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Register