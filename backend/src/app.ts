import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import ProductRoutes from "./routes/product.routes";
import stockRoutes from "./routes/stock.routes";

const app = express();
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/api/products",ProductRoutes);
app.use("/api/stocks",stockRoutes);


app.use(errorHandler);


export default app;
