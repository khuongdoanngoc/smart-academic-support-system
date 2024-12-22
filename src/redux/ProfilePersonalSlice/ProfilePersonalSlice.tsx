import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetProfileAPI,
  GetProfileRequest,
  listSearch,
  SearchDocProfilePersonalAPI,
} from "../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface SearchDoc {
  loading: boolean;
  error: string;
  listSearch: listSearch[];
  getUserProfile: GetProfileRequest | null;
}

export const SearchDocPersonalAction = createAsyncThunk<listSearch[], string>(
  "ProfilePersonalSlice/SearchDocProfilePersonal",
  async (name: string) => {
    try {
      const res = await SearchDocProfilePersonalAPI(name);
      return res as unknown as listSearch[];
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);
export const GetProFileAction = createAsyncThunk(
  "GetProFileAction",
  async () => {
    try {
      const response = GetProfileAPI();
      return response as unknown as GetProfileRequest;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);
const initialState: SearchDoc = {
  loading: false,
  error: "",
  listSearch: [],

  getUserProfile: null,
};
const ProfilePersonalSlice = createSlice({
  name: "ProfilePersonalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchDocPersonalAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProFileAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        SearchDocPersonalAction.fulfilled,
        (state, action: PayloadAction<listSearch[]>) => {
          state.loading = false;
          state.listSearch = action.payload;
        }
      )
      .addCase(
        GetProFileAction.fulfilled,
        (state, action: PayloadAction<GetProfileRequest>) => {
          state.loading = false;
          state.getUserProfile = action.payload;
        }
      )
      .addCase(SearchDocPersonalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search Failed";
      })
      .addCase(GetProFileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lấy thông tin user thất bại";
        toast.error(state.error);
      });
  },
});

export default ProfilePersonalSlice.reducer;
