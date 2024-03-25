import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

export const registerAPI= async(user)=>{

    return await commonAPI("post",`${BASE_URL}/user/register`,user,"")

}
export const loginAPI= async(reqbody)=>{

    return await commonAPI("post",`${BASE_URL}/user/login`,reqbody,"")

}
export const addProjects= async(reqBody,reqHeader)=>{

    return await commonAPI("post",`${BASE_URL}/project/addProject`,reqBody,reqHeader)

}
export const getHomeProjects= async()=>{

    return await commonAPI("GET",`${BASE_URL}/project/getHomeProject`,"","")

}

export const getAllProject =async(projectSearch,reqHeader) =>{
    return await commonAPI("GET",`${BASE_URL}/project/getAllproject?search=${projectSearch}`,"",reqHeader)
}

export const getUserProjectdata =async(reqHeader) =>{
    return await commonAPI("GET",`${BASE_URL}/project/getUserProject`,"",reqHeader)
}

export const updateUseProject=async(id,reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${BASE_URL}/project/updateproject/${id}`,reqBody,reqHeader)
}

export const deleteProjectAPI=async(id,reqHeader) =>{
    return await commonAPI("DELETE",`${BASE_URL}/project/deleteProject/${id}`,{},reqHeader)
}
 
export const addProfileAPI=async(reqBody,reqHeader) =>{
    return await commonAPI("post",`${BASE_URL}/profile/addProject`,reqBody,reqHeader)
}

export const getProfiledataAPI=async(reqHeader) =>{
    return await commonAPI("GET",`${BASE_URL}/profile/getuserProfile`,'',reqHeader)
}
