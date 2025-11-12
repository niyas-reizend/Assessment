import { useState } from "react"
import { addProduct } from "../service/allApi";
import {toast} from "react-toastify"
const AddProduct = () => {

    const [productData,setProductData] = useState({
    name:"",
    sku:"",
    price:0,
    currentStock:0,
    taxPercentage:0
    })

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try{
            const res =  await addProduct(productData)
            setProductData({
                name:"",
                sku:"",
                price:0,
                currentStock:0,
                taxPercentage:0
            });
            toast.success("Product Added successfully")
 
        }catch(error){
            console.log(error)

        }
    }
  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form >
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productSku" className="block text-gray-700 text-sm font-bold mb-2">
            Product Sku:
          </label>
          <input
            type="text"
            id="productSku"
            name="sku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Product Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currentStock" className="block text-gray-700 text-sm font-bold mb-2">
            Product Quantity:
          </label>
          <input
            type="text"
            id="currentStock"
            name="currentStock"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productData.currentStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tax" className="block text-gray-700 text-sm font-bold mb-2">
            taxPercentage:
          </label>
          <input
            type="text"
            id="tax"
            name="taxPercentage"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productData.taxPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <button className="border border-gray-900 p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 " onClick={handleSubmit}> add Product</button>

        </form>
    </div>
    </>

  )
}

export default AddProduct