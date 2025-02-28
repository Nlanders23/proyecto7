import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/Layout/Header'
import ClothsState from './Context/Cloths/ClothsState'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import ClothList from './components/Cloths/ClothList'
import UserState from './Context/Users/UserState'
import Category from './components/Cloths/Category'
import Footer from './components/Footer/Footer'

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
            <Route path='/catalogo-de-productos' element={<ClothList />} />
            <Route path='/categoria' element={<Category />} />
          </Routes>
          <Footer />
        </Router>
      </ClothsState>
    </UserState>

  )
}

export default App
