import { axiosInstance } from "../../utils/AxiosInterceptor";

export const GetDocumentsForAdmin = async () => {
    try {
        const res = await axiosInstance.get("admindocuments");
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const GetUsersForAdmin = async () => {
    try {
        const res = await axiosInstance.get("adminusers");
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};
