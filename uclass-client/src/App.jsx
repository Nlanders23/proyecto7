import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/Layout/Header'
import ClothsState from './Context/Cloths/ClothsState'

function App() {

  return (
    <ClothsState>
      <Router>
        <Header />
        <Routes>
          { /*RUTAS PÚBLICAS */}
          <Route path='/' element={<Home />} />


        </Routes>
      </Router>
    </ClothsState>
  )
}

export default App
