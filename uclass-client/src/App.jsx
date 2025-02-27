import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/Layout/Header'
import ClothsState from './Context/Cloths/ClothsState'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import UserState from './Context/Users/UserState'

function App() {

  return (
    <UserState>
      <ClothsState>
        <Router>
          <Header />
          <Routes>
            {/* {RUTA PRIVADA} */}
            <Route path='/perfil' element={<Profile />} />
            {/* {RUTAS DE AUTENTICACIÓN} */}
            <Route path='/registro' element={<Register />} />
            <Route path='/iniciar-sesion' element={<Login />} />
            { /*RUTAS PÚBLICAS */}
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ClothsState>
    </UserState>

  )
}

export default App
