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
import ClothSingle from './components/Cloths/ClothSingle'
import DetailCategory from './components/Cloths/DetailCategory'
import Checkout from './components/Checkout/Checkout'
import PrivateRoute from './routes/PrivateRoute'
import AuthRoute from './routes/AuthRoute'

function App() {

  return (
    <UserState>
      <ClothsState>
        <Router>
          <Header />
          <Routes>
            {/* {RUTAS PRIVADAS} */}
            
            <Route path='/perfil' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
               }/>
            <Route path='/carrito' element={
              <PrivateRoute>
                 <Checkout />
              </PrivateRoute>
             } />

            {/* {RUTAS DE AUTENTICACIÓN} */}
            <Route path='/registro' element={
              <AuthRoute>
                <Register />
              </AuthRoute>
              } />
            <Route path='/iniciar-sesion' element={
              <AuthRoute>
                <Login />
              </AuthRoute>
              } />
            { /*RUTAS PÚBLICAS */}
            <Route path='/' element={<Home />} />
            <Route path='/catalogo-de-productos' element={<ClothList />} />
            <Route path='/categoria' element={<Category />} />
            <Route path='/catalogo-de-productos/:name' element={<ClothSingle />}/>
            <Route path='/categoria/:category' element={<DetailCategory />}/>
            <Route path='/categoria/:category/:name' element={<ClothSingle />}/>
          </Routes>
          <Footer />
        </Router>
      </ClothsState>
    </UserState>

  )
}

export default App
