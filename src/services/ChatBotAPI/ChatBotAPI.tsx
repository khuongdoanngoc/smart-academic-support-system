/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../../utils/AxiosInterceptor";


export const sendMessageService= async (message:string)=>{
    try{
        const data = {
            "parts": [
              {
                "text": message
              }
            ]
          }
        const res= await axiosInstance.post(`/chat-bot/send-message`,data);
        return res;
    }catch(err: any){
        throw new Error(err.message);
    }
}