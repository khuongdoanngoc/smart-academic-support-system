import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileAuthorApi } from "../../services/ProfileAuthorApi/ProfileAuthorApi";
import { toast } from "react-toastify";

interface initialState {
  isloading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: initialState = {
  isloading: false,
  error: null,
  success: false,
};

export const DownloadDocumentAction = createAsyncThunk<string, number>(
  "ProfileAuthorSlice/DownloadDocumentAction",
  async (documentId: number) => {
    const res = await ProfileAuthorApi(documentId);
    return res as unknown as string;
  }
);

export const ProfileAuthorSlice = createSlice({
  name: "ProfileAuthorSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DownloadDocumentAction.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(
      DownloadDocumentAction.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isloading = false;
        state.success = true;

        if (action.payload) {
          toast.success("Document downloaded successfully");
        }
      }
    );
    builder.addCase(DownloadDocumentAction.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Failed to download document";
    });
  },
});

export default ProfileAuthorSlice.reducer;
