import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { userRegisterSchema } from "../validations/auth.validation";

const authRoutes = Router()

authRoutes.post("/register", validateBody(userRegisterSchema), registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;