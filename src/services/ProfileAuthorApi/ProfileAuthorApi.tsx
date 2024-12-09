import { AxiosError } from "axios"
import { axiosInstance } from "../../utils/AxiosInterceptor"




export const DownloadDocumentAuthorApi=async(documentId:number)=>{
  try {
    const response = await axiosInstance.get<{filePath:string}>(`/download/${documentId}`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}


export const FollowAuthorApi=async(email:string)=>{
  try {
    const response = await axiosInstance.post(`/follow/follow-by-email${email}`,null,{
      params:{email}
    })
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}

export const UnFollowAuthorApi=async(email:string)=>{
  try {
    const response = await axiosInstance.delete(`/follow/unfollow-by-email${email}`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}

export const ViewProfileAuthorApi=async()=>{
  try {
    const response = await axiosInstance.post(`/user/profile`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}
