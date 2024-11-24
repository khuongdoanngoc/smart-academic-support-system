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
  "editProfile/editProfile",
  async (data: UpdateProfileRequest, thunkAPI) => {
    try {
      const accountId = localStorage.getItem("accountId"); // Lấy ID từ localStorage
      const response = await axiosInstance.put(
        `/user/update-profile/${accountId}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default EditProfileAPI;
