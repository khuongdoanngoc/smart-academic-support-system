import { AxiosError } from "axios"
import { axiosInstance } from "../../utils/AxiosInterceptor"
import { IViewProfile } from "../../redux/ProfileAuthorSlice/ProfileAuthorSlice"



export const FollowAuthorApi=async(email:string)=>{
  try {
    const response = await axiosInstance.post(`/follow/follow-by-email?email=${email}`,null)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}

export const UnFollowAuthorApi=async(email:string)=>{
  try {
    const response = await axiosInstance.delete(`/follow/unfollow-by-email?email=${email}`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}

export const ViewProfileAuthorApi=async()=>{
  try {
    const response = await axiosInstance.get(`/user/profile`)
    return response
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}

export const ViewProfileAuthorByEmailApi=async(email:string)=>{
  try {
    const response = await axiosInstance.get(`/user/profile/email?email=${email}`)
    return response as unknown as IViewProfile
  } catch (err:unknown) {
    const error= err as AxiosError<{message?:string}>
    throw new Error(error.response?.data.message || error.message)
    
  }
}