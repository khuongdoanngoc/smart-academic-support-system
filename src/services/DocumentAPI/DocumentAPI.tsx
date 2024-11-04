import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export const GetDocumentByID = async (id: number) => {
    try {
        const res = await axiosInstance.get(baseUrl + `/document/${id}`);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
