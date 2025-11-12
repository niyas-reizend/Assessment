import { MenuIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
const Navbar = () => {


  const navigate = useNavigate();
  const handleAddProductClick = () =>{
    navigate('/addProduct')  
  }

    const handleProductClick = () =>{
    navigate('/')  
  }

  return (
        <nav className="h-16 flex justify-between items-center relative  px-6 bg-zinc-900 text-white">
      {/* Menu button for mobile */}
      <button
        className="md:hidden text-white hover:text-gray-400 pr-1"
      >
      <MenuIcon/>
      </button>

      <h1 className="text-lg font-semibold hidden md:block"> <span className="capitalize"> Hi User</span></h1>

      <div className="flex gap-4">
        <button className="hover:text-gray-400 font-bold mr-10 ctext-lg "  onClick={handleAddProductClick}>Add Product</button>
        <button className="hover:text-gray-400 font-bold mr-10 ctext-lg "  onClick={handleProductClick}>Product Page</button>
      </div>
    </nav>
    

  )
}

export default Navbar