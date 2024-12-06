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

export const GetAllDocuments = async () => {
    try {
        const res = await axiosInstance.get(baseUrl + "/document/all");
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const GetDocumentByTitle = async (title: string) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/search/${title}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const GetDocumentBySubject = async (subject: string) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/search/${subject}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const GetDocumentByFolder = async (folder: string) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/search/${folder}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const GetDocumentByFalcuty = async (falcuty: string) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/search/${falcuty}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
