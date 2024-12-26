import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  EditDocument,
  EditDocumentAPI,
} from "../../services/EditDocumentAPI/EditDocumentAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IEditDocument {
  loading: boolean;
  error: string;
  success: boolean;
  editDocument: EditDocument | null;
}

export const EditDocumentAction = createAsyncThunk(
  "editDocumentSlice/EditDocumentAction",
  async (data: EditDocument) => {
    try {
      const res = await EditDocumentAPI(data);
      return res as unknown as EditDocument;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      throw new Error(error.response?.data.message || error.message);
    }
  }
);
export const ResetEditDocumentSuccess = createAction(
  "editDocument/resetSuccess"
);

const initialState: IEditDocument = {
  loading: false,
  error: "",
  editDocument: null,
  success: false,
};

const EditDocumentSlice = createSlice({
  name: "EditDocumentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EditDocumentAction.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(ResetEditDocumentSuccess, (state) => {
        state.success = false;
      })
      .addCase(
        EditDocumentAction.fulfilled,
        (state, action: PayloadAction<EditDocument>) => {
          state.loading = false;
          state.editDocument = action.payload;
          state.success = true;
          toast.success("Cập nhật tài liệu thành công");
        }
      )
      .addCase(EditDocumentAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || "Cập nhật thất bại";
        toast.error("Cập nhật tài liệu thất bại");
      });
  },
});

export default EditDocumentSlice.reducer;
