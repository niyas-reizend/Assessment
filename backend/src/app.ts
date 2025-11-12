import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";

const app = express();


app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
