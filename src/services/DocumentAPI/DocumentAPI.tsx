import { axiosInstance } from "../../utils/AxiosInterceptor";

export const GetDocumentByID = async (id: number) => {
    try {
        const res = await axiosInstance.get(`/document/${id}`);
        return res;
    } catch (error: unknown) {
        if(error){
            throw new Error(error.message);
        }
        
    }
};
