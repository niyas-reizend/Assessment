import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import ProductRoutes from "./routes/product.routes";
import stockRoutes from "./routes/stock.routes";
import cors from "cors"
import salesRoutes from "./routes/sales.routes";

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/auth", authRoutes);
app.use("/api/products",ProductRoutes);
app.use("/api/stocks",stockRoutes);
app.use("/api/sales",salesRoutes);


app.use(errorHandler);


export default app;
