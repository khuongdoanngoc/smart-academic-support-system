import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowAuthorApi, DownloadDocumentAuthorApi, UnFollowAuthorApi, ViewProfileAuthorApi } from "../../services/ProfileAuthorApi/ProfileAuthorApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface initialState {
  isloading: boolean;
  error: string | null;
  success: boolean;
  followUser:string[],
  
}
const initialState: initialState = {
  isloading: false,
  error: null,
  success: false,
  followUser:[] as string[],
};

export interface IViewProfile{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  faculty: string;
  role: string;
  Followers:string;
  Following:string;
}

export const DownloadDocumentAuthorAction = createAsyncThunk<string, number>(
  "ProfileAuthorSlice/DownloadDocumentAuthorAction",
  async (documentId: number) => {
    try {
      const res = await DownloadDocumentAuthorApi(documentId);
      return res as unknown as string;
    } catch (error) {
      const res = error as AxiosError<{message?:string}>
      throw new Error(res.response?.data.message || res.message)
    }

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

export const ViewProfileAuthorAction = createAsyncThunk(
  "ProfileAuthorSlice/ViewProfileAuthorAction",
  async () => {
    try {
      const res = await ViewProfileAuthorApi();
      return res as unknown as string
    } catch (err:unknown) {
      const error = err as AxiosError<{message?:string}>
      throw new Error(error.response?.data.message || error.message)
    }
  }
);

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
          toast.success("Download success");
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
