import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { createUser, findUserByPhone } from "../services/auth.service";
import { UserRole } from "../entities/User.entity";
import { instanceToPlain } from "class-transformer";
import { generateAccessToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {phone_number, password, name, email, role} = req.body;

        const user = await findUserByPhone(phone_number);
        if(user){
            throw new ApiError("Phone number already registered", 409)
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser({
            password: hashedPassword,
            name,
            email,
            role: role || UserRole.USER
        })

        res.status(201).json({
            success: true,
            message: "User registration successful",
            data: instanceToPlain(newUser)
        })
   
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {phone_number, password} = req.body
        const user = await findUserByPhone(phone_number);
        if(!user){
            throw new ApiError("user not found", 404);
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if(!ismatch){
            throw new ApiError("Invalid credentials");
        }

        const accessToken = await generateAccessToken({
            user_id: user.user_id,
            name: user.name,
            role: user.role,
            email:user.email,
            phone_number: user.phone_number
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: instanceToPlain(user),
                accessToken
            }
        })
       
    } catch (error) {
        next(error)
    }
}