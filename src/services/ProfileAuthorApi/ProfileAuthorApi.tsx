import { AxiosError } from "axios"
import { axiosInstance } from "../../utils/AxiosInterceptor"



export const ProfileAuthorApi=async(documentId:number)=>{
  try {
    const response = await axiosInstance.get(`/download/${documentId}`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}