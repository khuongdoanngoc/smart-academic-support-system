import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EditProfileAPI, { UpdateProfileRequest } from "../../services/EditProfileAPI/EditProfileAPI";
import { AxiosError } from "axios";

interface EditProfileState {
  isloading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: EditProfileState = {
  isloading: false,
  error: null,
  success: false,
};

export const EditProfileAction = createAsyncThunk(
  "EditProfileAction",
  async(data: UpdateProfileRequest)=>{
    try {
      const response = EditProfileAPI(data);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
)
const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isloading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditProfileAction.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(EditProfileAction.fulfilled, (state) => {
        state.isloading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(EditProfileAction.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message||"Cập nhật thất bại";
      });
  },
});

export const { resetState } = editProfileSlice.actions;
export default editProfileSlice.reducer;
