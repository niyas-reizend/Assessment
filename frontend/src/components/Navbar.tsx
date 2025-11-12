import { MenuIcon } from "lucide-react"
const Navbar = () => {
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
        <button className="hover:text-gray-400 font-bold mr-10 ctext-lg " >Profile</button>
      </div>
    </nav>
    

  )
}

export default Navbar