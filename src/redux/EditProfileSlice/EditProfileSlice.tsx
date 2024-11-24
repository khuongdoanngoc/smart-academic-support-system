import { createSlice } from "@reduxjs/toolkit";
import EditProfileAPI from "../../services/EditProfileAPI/EditProfileAPI";

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
const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isloading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditProfileAPI.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(EditProfileAPI.fulfilled, (state) => {
        state.isloading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(EditProfileAPI.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = editProfileSlice.actions;
export default editProfileSlice.reducer;
