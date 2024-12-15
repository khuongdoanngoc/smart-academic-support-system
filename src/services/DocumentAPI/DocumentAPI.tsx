
import { axiosInstance } from "../../utils/AxiosInterceptor";

// export const GetDocumentByID = async (id: number) => {
//     try {
//         const res = await axiosInstance.get(`/document/${id}`);
//         return res;
//     } catch (error: unknown) {
//         if(error){
//             throw new Error(error.message);
//         }
        
//     }
// };

// export const GetAllDocuments = async () => {
//     try {
//         const res = await axiosInstance.get(baseUrl + "/document/all");
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

// export const GetDocumentByTitle = async (title: string) => {
//     try {
//         const res = await axiosInstance.get(baseUrl + `/search/${title}`);
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

// export const GetDocumentBySubject = async (subject: string) => {
//     try {
//         const res = await axiosInstance.get(baseUrl + `/search/${subject}`);
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

// export const GetDocumentByFolder = async (folder: string) => {
//     try {
//         const res = await axiosInstance.get(baseUrl + `/search/${folder}`);
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };


// export const GetDocumentByFalcuty = async (falcuty: string) => {
//     try {
//         const res = await axiosInstance.get(baseUrl + `/search/${falcuty}`);
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

export const GetDocumentByFalcuty = async (falcuty: string) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/search/${falcuty}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const GetDocumentStogeAPI = async(pageSize:number=5,pageNum:number=0)=>{
    try {
        const response = await axiosInstance.get<documentState[]>(`document/all`,{
            params:{pageSize,pageNum}
        })
        return response
    } catch (err:unknown) {
        const error = err as AxiosError<{message?:string}>
        throw new Error(error.response?.data.message || error.message)
        
    }
}

export const DownloadDocumentAuthorApi=async(docId:number)=>{
    try {
      const response = await axiosInstance.get<{filePath:string}>(`/download/${docId}`)
      return response
    } catch (err:unknown) {
      const error= err as AxiosError<{message?:string}>
      throw new Error(error.response?.data.message || error.message)
    }
  }

export const SaveDownLoadHistoryApi= async (fullname:string,docId:number)=>{
    try {
        const res = await axiosInstance.post(`/history/track`,{
            fullname,
            docId
        })
        return res
    } catch (err:unknown) {
        const error = err as AxiosError<{message?:string}>
        throw new Error(error.response?.data.message || error.message)
    }
}


export const DelectDocumentStoge = async(id:number)=>{
    try {
        const res = await axiosInstance.delete(`/document/${id}`);
        return res
    } catch (err:unknown) {
        const error = err as AxiosError<{message?:string}>
        throw new Error(error.response?.data.message || error.message)
    }
}
