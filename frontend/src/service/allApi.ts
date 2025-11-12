import commonAPI from "./commonApi"

const baseURL = "http://localhost:4000"

export const addProperty = async(data:any)=>{
    return await commonAPI('post',`${baseURL}/api/add-property`,data)
}

export const getProducts = async()=>{
    return await commonAPI('get',`${baseURL}/api/products`)
}




