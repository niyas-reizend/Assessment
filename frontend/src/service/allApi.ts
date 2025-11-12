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



