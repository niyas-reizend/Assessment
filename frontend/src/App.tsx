
import './App.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <Router>
      <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ProductPage/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
