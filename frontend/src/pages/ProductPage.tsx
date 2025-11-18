import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/allApi"
import {toast} from "react-toastify";
import { AddStockModal } from "@/components/others/AddStockModal";
import { UpdateModal } from "@/components/others/UpdateModal";

const ProductPage = () => {
    const [products,setProducts] = useState([])


    const fetchProducts = async() =>{
        try{
            const res = await getProducts();
            console.log(res.data.products);
            setProducts(res.data.products);

        }catch(error){
            console.log(error)    
        }
    }

    const handleDelete = async(id:number) => {
      try{
        const res = await  deleteProduct(id)
        toast.success("Product deleted")
        fetchProducts();
        
      }catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
        fetchProducts();

    },[]);

  return (
    <>
  <div className="bg-white p-4 mt-4 max-h-screen  rounded-lg relative shadow-lg">

    <div className="flex justify-between mb-3">
    <h1 className="text-3xl mb-3">Products Page</h1>
    <h1></h1>
    </div>
    
      {/* product list  Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">SKU</th>
              <th scope="col" className="px-6 py-3">STOCK</th>
              <th scope="col" className="px-6 py-3">PRICE</th>
              <th scope="col" className="px-6 py-3">Delete</th>
              <th scope="col" className="px-6 py-3">Update</th>
              <th scope="col" className="px-6 py-3">ADD STOCK</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p:any) => (
              <tr key={p.product_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                  {p.name}
                </th>
                <td className="px-6 py-4">{p.sku}</td>
                <td className="px-6 py-4">{p.currentStock}</td>
                <td className="px-6 py-4">{p.price}</td>
                <td className="px-6 py-4"><button className="border p-1 rounded-lg hover:bg-red-500 hover:text-white active:bg-red-700" onClick={()=>handleDelete(p.product_id)}>Delete</button></td>
                <td className="px-6 py-4"> <UpdateModal productId ={p.product_id} productFetch={fetchProducts}/></td>
                <td className="px-6 py-4"><AddStockModal productId ={p.product_id} productFetch={fetchProducts}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
    </>
  )
}

export default ProductPage