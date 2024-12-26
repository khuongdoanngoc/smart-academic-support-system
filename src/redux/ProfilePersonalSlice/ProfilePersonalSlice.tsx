import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentPersonalDtos,
  GetProfileAPI,
  GetProfileRequest,
  listSearch,
  SearchDocProfilePersonalAPI,
  ViewProfilePersonalByEmailApi,
} from "../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { DocumentByAccountRequest } from "../DocumentSlice/InterfaceResponse";
import { AllDocumentPersonalByEmailAPI } from "../../services/DocumentAPI/DocumentAPI";

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
  "ProfilePersonalSlice/GetProFileAction",
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

export const ViewProfilePersonalByEmailAction = createAsyncThunk<
  GetProfileRequest,
  string
>(
  "ProfilePersonalSlice/ViewProfilePersonalByEmailAction",
  async (email: string) => {
    try {
      const res = await ViewProfilePersonalByEmailApi(email);
      return res as unknown as GetProfileRequest;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);

export const GetProFilePageAction = createAsyncThunk<
  DocumentPersonalDtos[],
  DocumentByAccountRequest
>("documents/GetProFileAction", async (data: DocumentByAccountRequest) => {
  try {
    const response = await AllDocumentPersonalByEmailAPI(data);
    return response as unknown as DocumentPersonalDtos[];
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
});

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
      .addCase(GetProFilePageAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(ViewProfilePersonalByEmailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SearchDocPersonalAction.fulfilled,
        (state, action: PayloadAction<listSearch[]>) => {
          state.loading = false;
          state.listSearch = action.payload;
        }
      )
      .addCase(
        GetProFilePageAction.fulfilled,
        (state, action: PayloadAction<DocumentPersonalDtos[]>) => {
          state.loading = false;
          if (state.getUserProfile) {
            state.getUserProfile.documentDtos = action.payload;
          }
        }
      )
      .addCase(
        GetProFileAction.fulfilled,
        (state, action: PayloadAction<GetProfileRequest>) => {
          state.loading = false;
          state.getUserProfile = action.payload;
        }
      )
      .addCase(
        ViewProfilePersonalByEmailAction.fulfilled,
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
      })
      .addCase(GetProFilePageAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lấy thông tin user thất bại";
        toast.error(state.error);
      })
      .addCase(ViewProfilePersonalByEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get user";
      });
  },
});

export default ProfilePersonalSlice.reducer;
