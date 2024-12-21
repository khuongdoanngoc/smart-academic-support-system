import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
// import { SearchInterface } from "../../redux/SearchUserSlice/SearchUserSlice";

export interface SearchInterface {
  firstName: string;
  lastName:string;
  email:string;
  profilePicture:string;
}


export interface SearchViewUserInterface {
  firstName: string;
  lastName:string;
  email:string;
  profilePicture:string;
  major:string;
  follower:string;
  following:string;
}



export const SearchUserAPI = async (name: string,pageSize:number =5,pageNum:number=0) => {
  try {
    const response = await axiosInstance.get<SearchInterface>(
      `user-search/search-by-name?name=${name}&pageSize=${pageSize}&pageNum=${pageNum}`
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message);
  }
};

export const SearchUserInformationAPI = async(email:string)=>{
  try {
    const response = await axiosInstance.post<SearchViewUserInterface>(
      `user-search/search-by-name?email=${email}`
    );
    return response
  } catch (err:unknown) {
    const error = err as AxiosError<{message?:string}>
    throw new Error(error.message)
  }
}
