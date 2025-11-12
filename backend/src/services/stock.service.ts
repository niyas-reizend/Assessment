import { dataSource } from "../config/data-source"
import { Product } from "../entities/Product.entity"
import { ProductEntry } from "../entities/ProductEntry.entity"
import { ApiError } from "../utils/apiError";


const entryRepo = dataSource.getRepository(ProductEntry);
const productRepo = dataSource.getRepository(Product);


export const addStock = async(product_id:string,quantity:number,purchasePrice:number) => {

    const product =  await productRepo.findOne({where:{product_id:product_id}})
    if(!product){
        throw new ApiError("Product not found",404);
    }

    const newStock =  entryRepo.create({
        quantity:quantity,
        purchasePrice:purchasePrice,
        product:product
    })
    await entryRepo.save(newStock);

    product.currentStock += quantity;
    
    await productRepo.save(product);
    return newStock

}


export const getStockEntries = async() => {
    const  entries = await entryRepo.find({
        relations:["product"]
    })

    return entries;

}

