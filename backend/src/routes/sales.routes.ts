import { Router } from "express";
import { fetchSale, handleSales } from "../controllers/sales.controller";


const salesRoutes = Router();

salesRoutes.post("/create",handleSales);
salesRoutes.get("/fetchSales",fetchSale);

export default salesRoutes;