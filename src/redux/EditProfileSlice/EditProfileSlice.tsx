import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  EditProfileAPI,
  UpdateProfileRequest,
} from "../../services/EditProFileApi/EditProfileAPI";

interface EditProfileState {
  loading: boolean;
  error: string | null;
  success: boolean;
  profileData: UpdateProfileRequest | null;
}
const initialState: EditProfileState = {
  loading: false,
  error: null,
  success: false,
  profileData: null,
};

export const EditProfileAction = createAsyncThunk(
  "EditProfileAction",
  async (data: UpdateProfileRequest) => {
    try {
      const res = await EditProfileAPI(data);
      return res as unknown as UpdateProfileRequest;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);
export const ResetEditProfileSuccess = createAction(
  "editDocument/resetSuccess"
);

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EditProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ResetEditProfileSuccess, (state) => {
        state.success = false;
      })

      .addCase(
        EditProfileAction.fulfilled,
        (state, action: PayloadAction<UpdateProfileRequest>) => {
          state.loading = false;
          state.success = true;
          state.profileData = action.payload;
          toast.success("Cập nhật thành công");
        }
      )

      .addCase(EditProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Cập nhật thất bại";
        toast.error(state.error);
        state.success = false;
      });
  },
});

// export const { resetState } = editProfileSlice.actions;
export default editProfileSlice.reducer;
