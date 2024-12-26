import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

export interface listSearch {
  id: number;
  title: string;
}

export interface DocumentPersonalDtos {
  filePath: string;
  
  docId: number,
    title: string,
    description: string,
    type: string,
    subjectName: string,
    facultyName: string,

  //thêm
  
}
export interface GetProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  birthDate: string;
  gender: string;
  hometown: string;
  phoneNumber: string;
  // facultyName: number; //chỉnh sửa
  major: string;
  enrollmentYear: number;
  classNumber: string;
  follower: string;
  following: string;
  role: string | null;
  documentDtos: DocumentPersonalDtos[];
  totalPage: number;
  totalDocument: number;

  //thêm
  facultyName: string;
  facultyId: number;
}
export const SearchDocProfilePersonalAPI = async (name: string) => {
  try {
    const response = await axiosInstance.get<listSearch[]>(
      `document/search/${name}`
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
export const GetProfileAPI = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};

export const ViewProfilePersonalByEmailApi = async (email: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/profile/email?email=${email}`
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
