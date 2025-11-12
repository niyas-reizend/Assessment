import { NextFunction,Request,Response } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../services/product.service";


export const handleAddProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{

        const {name,sku,price,currentStock,taxPercentage} = req.body;

        const result = await addProduct(name,sku,price,currentStock,taxPercentage);

        res.status(200).json({
            success:true,
            message:"Product added successfully",
            data:result

        })
    }catch(error){
        next()

    }
}


export const handleUpdateProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const product_id = req.params.id;
    const {name,sku,price,currentStock,taxPercentage} = req.body;

    const updatedProduct = await updateProduct(name,sku,price,currentStock,taxPercentage,product_id);

    res.status(200).json({
        success:true,
        message:"product Updated successfully",
        data:updatedProduct
    })

  } catch (error) {
    next(error)
  }
};


export const handleDeleteProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await deleteProduct(id);
    
    res.status(200).json({
        success:true,
        message:"Product Deleted",
        
    })

  } catch (error) {
    next(error);
  }
};



export const handleGetAllProducts = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await getAllProducts();

    res.status(200).json({
        success:true,
        message:"Fetched all Products",
        products:result
    })

  } catch (error) {
    next(error);
  }
};