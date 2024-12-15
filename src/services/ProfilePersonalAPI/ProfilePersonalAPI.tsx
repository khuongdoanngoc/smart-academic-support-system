import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

export interface listSearch {
  id: number;
  title: string;
}
export const SearchDocProfilePersonalAPI = async (name: string) => {
  try {
    const response = await axiosInstance.get<listSearch[]>(`document/search/${name}`);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
