import { axiosInstance } from "../../utils/AxiosInterceptor";

export const GetStatsForUser = async () => {
    try {
        const res = await axiosInstance.get(`/user/stats`);
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};
