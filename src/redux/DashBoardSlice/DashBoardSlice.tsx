import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DelectProfilePictureAPI,
  GetProfileDashBoardAPI,
  GetProfileRequest,
} from "../../services/DashBoardAPI/DashBoardAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface SearchDoc {
  loading: boolean;
  error: string;
  getProfileDash: GetProfileRequest | null;
}

export const GetProFileDashAction = createAsyncThunk(
  "DashBoardSlice/GetProFileAction",
  async (id: number) => {
    try {
      const response = GetProfileDashBoardAPI(id);
      return response as unknown as GetProfileRequest;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);
export const DelectProfilePictureAction = createAsyncThunk(
  "DashBoardSlice/DelectProfilePictureAction",
  async () => {
    try {
      const res = await DelectProfilePictureAPI();
      return res;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);
const initialState: SearchDoc = {
  loading: false,
  error: "",
  getProfileDash: null,
};
const DashBoardSlice = createSlice({
  name: "DashBoardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(GetProFileDashAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(DelectProfilePictureAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        GetProFileDashAction.fulfilled,
        (state, action: PayloadAction<GetProfileRequest>) => {
          state.loading = false;
          state.getProfileDash = action.payload;
        }
      )
      .addCase(DelectProfilePictureAction.fulfilled, (state) => {
        state.loading = false;
        if (state.getProfileDash) {
          state.getProfileDash.profilePicture = null;
        }

        toast.success("Xoá ảnh thành công");
      })

      .addCase(GetProFileDashAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lấy thông tin user thất bại";
        toast.error(state.error);
      })
      .addCase(DelectProfilePictureAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xoá ảnh thất bại";
      });
  },
});

export default DashBoardSlice.reducer;
