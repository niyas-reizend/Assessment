import commonAPI from "./commonApi"

const baseURL = "http://localhost:4000"

export const getProducts = async()=>{
    return await commonAPI('get',`${baseURL}/api/products`)
}


export const addProduct = async(data:any)=>{
    return await commonAPI('post',`${baseURL}/api/products/add`,data)
}

export const deleteProduct = async(data:any)=>{
    return await commonAPI('delete',`${baseURL}/api/products/delete/${data}`)
}

export const addStock = async(data:any)=>{
    return await commonAPI('post',`${baseURL}/api/stocks/addstock`,data)
}

export const updateProduct = async(id:string,data:any)=>{
    return await commonAPI('patch',`${baseURL}/api/products/update/${id}`,data)
}


export const fetchSale = async() =>{
    return await commonAPI('get',`${baseURL}/api/sales/fetchSales`)
}

export const createSale = async(data:any) =>{
    console.log("dataain aapi",data)
    return await commonAPI('post',`${baseURL}/api/sales/create`,data)
}






