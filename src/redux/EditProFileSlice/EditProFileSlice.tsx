import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditProFileApi } from "../../services/EditProFileApi/EditProFileApi";
import { toast } from "react-toastify";

interface initialState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
const IFollowProFile: initialState = {
  isLoading: false,
  error: "",
  success: false,
};
export const FollowProFileAction = createAsyncThunk<string, number>(
  "EditProFileSlice/FollowProFileAction",
  async (followingId: number) => {
    const res = await EditProFileApi(followingId);
    return res as unknown as string;
  }
);

export const EditProFileSlice = createSlice({
  name: "EditProFileSlice",
  initialState: IFollowProFile,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FollowProFileAction.pending, (state) => {
      state.isLoading = true;
    });
    console.log("pending");

    builder.addCase(
      FollowProFileAction.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.success = true;
        console.log(action.payload);
        if (action.payload) {
          toast.success("Follow success");
        }
      }
    );
    builder.addCase(FollowProFileAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to follow user";
    });
  },
});

export default EditProFileSlice.reducer;
