/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseUrl= "http://127.0.0.1:5000/api"
export const sendMessageService= async (message:string)=>{
    try{
        const data = {
            "parts": [
              {
                "text": message
              }
            ]
          }
        const res= await axios.post(`${baseUrl}/search`,data);
        return res.data;
    }catch(err: any){
        throw new Error(err.message);
    }
}