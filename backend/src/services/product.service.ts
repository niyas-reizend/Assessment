import { dataSource } from "../config/data-source"
import { Product } from "../entities/Product.entity"
import { ApiError } from "../utils/apiError";


const productRepo = dataSource.getRepository(Product);

export const addProduct = async(name:string,sku:string,price:number,currentStock:number,taxPercentage:number) =>{
    
    const sku_exist = await productRepo.findOne({where:{sku:sku}})
    if(sku_exist){
        throw new ApiError("sku already exist")
    }

    const newProduct =  productRepo.create({
        name:name,
        sku:sku,
        price:price,
        currentStock:currentStock,
        taxPercentage:taxPercentage
    })
    return await productRepo.save(newProduct);
}


export const updateProduct = async(name:string,sku:string,price:number,currentStock:number,taxPercentage:number,product_id:string) => {

    const product = await productRepo.findOne({where:{product_id:product_id}});
    if(!product){
        throw new ApiError("Product not found",404);
    }

    product.name = name;
    product.sku = sku;
    product.currentStock = currentStock;
    product.price = price;
    product.taxPercentage = taxPercentage;

    return await productRepo.save(product);   
}



export const deleteProduct = async (id: string) => {

  const product = await productRepo.findOneBy({ product_id:id });

  if (!product) {
    throw new ApiError("Product not found",404);
  }
  await productRepo.remove(product);

};


export const getAllProducts = async () => {

  const products = await productRepo.find({
    order: { createdAt:"DESC" },
  });
  
  return products

};
