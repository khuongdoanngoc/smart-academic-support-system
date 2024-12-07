import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
// import { SearchInterface } from "../../redux/SearchUserSlice/SearchUserSlice";

export interface SearchInterface {
  firstName: string;
  lastName:string;
  email:string;
  profilePicture:string;
}

export const SearchUserAPI = async (data: string) => {
  try {
    const response = await axiosInstance.get<SearchInterface>(
      `user-search/search-by-name?name=${data}`
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message);
  }
};
