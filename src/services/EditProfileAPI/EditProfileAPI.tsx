import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  hometown: string;
  email:string;
  phoneNumber: string;
  facultyId:string;
  major:string;
  enrollmentYear: number;
  classNumber: string;
  avatar:File | null;
}


const EditProfileAPI = createAsyncThunk(
  "editProfile",
  async (data: UpdateProfileRequest) => {
    try {
      const response = await axiosInstance.put(
        `/user/update-profile`,
        data
      );
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);

export default EditProfileAPI;
