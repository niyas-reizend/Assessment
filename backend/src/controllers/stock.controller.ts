import { NextFunction,Request,Response } from "express";
import { addStock, getStockEntries } from "../services/stock.service";

export const handleAddStock = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const {product_id ,quantity,purchasePrice} = req.body;

        const result = await addStock(product_id,quantity,purchasePrice);

        res.status(200).json({
            success:true,
            message:"Stock Added",
            data:result
        })

    }catch(error){
        next(error);

    }
}


export const handleGetStockEntries = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const result = await getStockEntries();

        res.status(200).json({
            success:true,
            message:"fetched the entries",
            data:result
        })

    }catch(error){
        next(error);
    }
}