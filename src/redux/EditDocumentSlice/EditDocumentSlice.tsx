import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EditDocument,
  EditDocumentAPI,
} from "../../services/EditDocumentAPI/EditDocumentAPI";
import { AxiosError } from "axios";

interface IEditDocument {
  loding: boolean;
  error: string;
  editDocument: EditDocument | null;
}

export const EditDocumentAction = createAsyncThunk(
  "editDocumentSlice/EditDocumentAction",
  async (data: EditDocument) => {
    try {
      const res = EditDocumentAPI(data);
      return res as unknown as EditDocument;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      throw new Error(error.response?.data.message || error.message);
    }
  }
);

const initialState: IEditDocument = {
  loding: false,
  error: "",
  editDocument: null,
};

const editDocumentSlice = createSlice({
  name: "EditDocumentSlce",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EditDocumentAction.pending, (state) => {
        state.loding = true;
      })
      .addCase(
        EditDocumentAction.fulfilled,
        (state, action: PayloadAction<EditDocument>) => {
          state.loding = false;
          state.editDocument = action.payload;
        }
      )
      .addCase(EditDocumentAction.rejected, (state, action) => {
        state.loding = false;
        state.error = action.error.message || "Cập nhật thất bại";
      });
  },
});

export default editDocumentSlice.reducer;
