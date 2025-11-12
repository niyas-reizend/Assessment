import { Router } from "express";
import { handleAddProduct, handleDeleteProduct, handleGetAllProducts, handleUpdateProduct } from "../controllers/product.controller";



const ProductRoutes = Router()

ProductRoutes.post("/add",handleAddProduct);
ProductRoutes.patch("/update/:id",handleUpdateProduct);
ProductRoutes.delete("/delete/:id",handleDeleteProduct);
ProductRoutes.get("/",handleGetAllProducts);



export default ProductRoutes;