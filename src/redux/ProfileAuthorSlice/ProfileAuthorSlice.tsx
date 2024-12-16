import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowAuthorApi, UnFollowAuthorApi, ViewProfileAuthorApi, ViewProfileAuthorByEmailApi } from "../../services/ProfileAuthorApi/ProfileAuthorApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface IViewProfile{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  birthDate: string | null;
  gender: string | null;
  hometown: string | null;
  phoneNumber: string | null;
  facultyName: string | null;
  major: string | null;
  enrollmentYear: string | null;
  classNumber: string | null;
  role: string[];
  follower:number;
  following:number;
}
interface initialState {
  isloading: boolean;
  error: string | null;
  success: boolean;
  followUser:string[],
  viewProfile: IViewProfile | null;
}
const initialState: initialState = {
  isloading: false,
  error: null,
  success: false,
  followUser: [] as string[],
  viewProfile: null
};





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

export const ViewProfileAuthorByEmailAction = createAsyncThunk<IViewProfile,string>(
  "ProfileAuthorSlice/ViewProfileAuthorByEmailAction",
  async (email:string) => {
    try {
      const res = await ViewProfileAuthorByEmailApi(email);
      return res as unknown as IViewProfile
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
    builder.addCase(FollowAuthorAction.pending, (state) => {
      state.isloading = true;
    })
    .addCase(UnFollowAuthorAction.pending, (state) => {
      state.isloading = true;
    })
    .addCase(ViewProfileAuthorByEmailAction.pending, (state) => {
      state.isloading = true;
    })
    
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
    .addCase(ViewProfileAuthorByEmailAction.fulfilled, (state, action: PayloadAction<IViewProfile>) => {
      state.isloading = false;
      state.viewProfile= action.payload;
    })
    .addCase(FollowAuthorAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to follow user";
    })
    .addCase(UnFollowAuthorAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to UnFollow user";
    })
    .addCase(ViewProfileAuthorByEmailAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to get user";
    })
  },
});

export default ProfileAuthorSlice.reducer;
