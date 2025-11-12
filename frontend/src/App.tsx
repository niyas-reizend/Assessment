
import './App.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
