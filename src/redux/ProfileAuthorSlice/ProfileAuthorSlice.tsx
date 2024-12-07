import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowAuthorApi, DownloadDocumentAuthorApi, UnFollowAuthorApi } from "../../services/ProfileAuthorApi/ProfileAuthorApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface initialState {
  isloading: boolean;
  error: string | null;
  success: boolean;
  followUser:string[]
}
const initialState: initialState = {
  isloading: false,
  error: null,
  success: false,
  followUser:[] as string[]
};

export const DownloadDocumentAuthorAction = createAsyncThunk<string, number>(
  "ProfileAuthorSlice/DownloadDocumentAuthorAction",
  async (documentId: number) => {
    const res = await DownloadDocumentAuthorApi(documentId);
    return res as unknown as string;
  }
);

export const FollowAuthorAction = createAsyncThunk<string, string>(
  "ProfileAuthorSlice/FollowAuthorAction",
  async(email:string)=>{
    try {
      const res = await FollowAuthorApi(email);
      return res as unknown as string
    } catch (error) {
      const res = error as AxiosError<{message?:string}>
      throw new Error(res.response?.data.message || res.message)
    }
  }
)


export const UnFollowAuthorAction = createAsyncThunk<string, string>(
  "ProfileAuthorSlice/UnFollowAuthorAction",
  async(email:string)=>{
    try {
      const res = await UnFollowAuthorApi(email);
      return res as unknown as string
    } catch (error) {
      const res = error as AxiosError<{message?:string}>
      throw new Error(res.response?.data.message || res.message)
    }
  }
)

export const ProfileAuthorSlice = createSlice({
  name: "ProfileAuthorSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DownloadDocumentAuthorAction.pending, (state) => {
      state.isloading = true;
    })
    .addCase(FollowAuthorAction.pending, (state) => {
      state.isloading = true;
    })
    .addCase(UnFollowAuthorAction.pending, (state) => {
      state.isloading = true;
    })
    .addCase(
      DownloadDocumentAuthorAction.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isloading = false;
        state.success = true;
        if (action.payload) {
          toast.success("Document downloaded successfully");
        }
      }
    )
    .addCase(FollowAuthorAction.fulfilled, (state, action: PayloadAction<string>) => {
      state.isloading = false;
      state.success = true;
      if (action.payload) {
        toast.success("Follow success");
      }
    })
    .addCase(UnFollowAuthorAction.fulfilled, (state, action: PayloadAction<string>) => {
      state.isloading = false;
      state.success = true;
      if (action.payload) {
        toast.success("UnFollow success");
      }
    })
  .addCase(DownloadDocumentAuthorAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to download document";
    })

    .addCase(FollowAuthorAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to follow user";
    })
    .addCase(UnFollowAuthorAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to UnFollow user";
    })
  },
});

export default ProfileAuthorSlice.reducer;
