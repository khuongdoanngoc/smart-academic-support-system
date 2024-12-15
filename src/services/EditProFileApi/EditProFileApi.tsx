import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

export const EditProFileApi = async (followingId: number) => {
  try {
    const res = await axiosInstance.post(`/follow/${followingId}`);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.status === 401) {
      throw new Error("Please login to follow user");
    }
    throw new Error(error.response?.data.message || error.message);
  }
};
