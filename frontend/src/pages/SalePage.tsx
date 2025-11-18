import { useEffect, useState } from "react";

import { CreateSaleModal } from "@/components/others/CreateSaleModal";
import { SalesTable } from "@/components/others/SalesTable";
import { fetchSale, getProducts } from "@/service/allApi";

export interface Sales{
    sales_id:string;
    amountToPay:number;
    discout:number;
    soldAt:Date;
    totalSalesPrice:number;
    totalTax:number;
}

export interface Products{
    product_id:string;
    name:string;
    sku:string;
    price:number;
    currentStock:number;
    taxPercentage:number;
    createdAt:Date;
}

export default function SalesPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [sales, setSales] = useState<Sales[]>([]);

const getSales = async() => {
    try{
        const res = await fetchSale();
        console.log(res.data.result)
        setSales(res.data.result)

    }catch(error){
        console.log(error);
    }
}

  const getProduct = async() =>{
    const res =  await getProducts();
    console.log(res.data.products)
    setProducts(res.data.products)
  }

  useEffect(() => {
    getSales();
    getProduct();

  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      <CreateSaleModal
        products={products}
  
      />

      <h2 className="text-xl font-semibold">Sales List</h2>
      <SalesTable sales={sales} />
    </div>
  );
}
