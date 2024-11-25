import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  hometown: string;
  phoneNumber: string;
  facultyId: number;
  major: string;
  enrollmentYear: number;
  classNumber: string;
}

const EditProfileAPI = createAsyncThunk(
  "editProfile",
  async (data: UpdateProfileRequest, thunkAPI) => {
    try {
      const accountId = localStorage.getItem("accountId");
      console.log(accountId);

      if (!accountId) {
        throw new Error("Vui lòng đăng nhập!");
      }
      const response = await axiosInstance.put(
        `/user/update-profile/${accountId}`,
        data
      );
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export default EditProfileAPI;
