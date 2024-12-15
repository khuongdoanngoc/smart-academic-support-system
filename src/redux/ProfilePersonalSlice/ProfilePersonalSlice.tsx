import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  listSearch,
  SearchDocProfilePersonalAPI,
} from "../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import { AxiosError } from "axios";

export interface SearchDoc {
  loading: string;
  error: string;
  listSearch: listSearch[];
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
const initialState: SearchDoc = {
  loading: "",
  error: "",
  listSearch: [],
};
const ProfilePersonalSlice = createSlice({
  name: "ProfilePersonalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SearchDocPersonalAction.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(SearchDocPersonalAction.fulfilled, (state, action:PayloadAction<listSearch[]>) => {
      state.loading = "success";
      state.listSearch = action.payload;
    });
    builder.addCase(SearchDocPersonalAction.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Search Failed";
    });
  },
});

export default ProfilePersonalSlice.reducer;
