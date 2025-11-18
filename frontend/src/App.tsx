
import './App.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Navbar from './Navbar'
import AddProduct from './pages/AddProduct'
import { ToastContainer } from 'react-toastify'
import SalesPage from './pages/SalePage'

function App() {

  return (
    <>
    <Router>
      <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ProductPage/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/sales" element={<SalesPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
