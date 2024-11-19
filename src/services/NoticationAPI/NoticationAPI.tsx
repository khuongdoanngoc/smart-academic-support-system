import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

interface DelectId {
  notificationId: number;
}

export const NoticationDelect = async (
  notificationId: DelectId
): Promise<AxiosResponse<number>> => {
  try {
    const res = await axiosInstance.post(`/read/${notificationId}`);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message || error.message);
  }
};
