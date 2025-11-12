import { Router } from "express";
import { handleAddProduct, handleDeleteProduct, handleGetAllProducts, handleUpdateProduct } from "../controllers/product.controller";
import { handleAddStock, handleGetStockEntries } from "../controllers/stock.controller";



const stockRoutes = Router();

stockRoutes.post("/addstock",handleAddStock);
stockRoutes.get("/",handleGetStockEntries);

export default stockRoutes;