import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  DelectDocumentStoge,
  documentState,
  DownloadDocumentAuthorApi,
  GetDocumentStogeAPI,
  SaveDownLoadHistoryApi,
} from "../../services/DocumentAPI/DocumentAPI";
import { DocumentResponse } from "./InterfaceResponse";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface InitialStateStyles {
  loading: boolean;
  error: string;
  document: DocumentResponse[];
  documentStoge: documentState[];
}

// export const getDocumentByID = createAsyncThunk<DocumentResponse, number>(
//     "getBookById",
//     async (id: number) => {
//         try {
//             const response = await GetDocumentByID(id);
//             return response.data as DocumentResponse;
//         } catch (err: unknown) {
//       const error = err as AxiosError<{ message?: string }>;
//       throw new AxiosError(error.message);
//         }
//     }
// );

export const GetDocumentStogeAction = createAsyncThunk<
  documentState[],
  { pageSize: number; pageNum: number }
>("GetDocumentStogeAction", async ({ pageSize, pageNum }) => {
  try {
    const response = await GetDocumentStogeAPI(pageSize, pageNum);
    return response.data as documentState[];
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
});

// export const DownloadDocumentAuthorAction = createAsyncThunk<string, number>(
//   "DocumentSlice/DownloadDocumentAuthorAction",
//   async (documentId: number) => {
//     try {
//       const res = await DownloadDocumentAuthorApi(documentId);
//       return res.data.filePath;
//     } catch (error) {
//       const res = error as AxiosError<{ message?: string }>;
//       throw new Error(res.response?.data.message || res.message);
//     }
//   }
// );


export const DownloadDocumentAction = createAsyncThunk<string, {fullname:string,docId:number}>(
  "DocumentSlice/DownloadDocumentAuthorAction",
  async ({fullname,docId}) => {
    try {
      const res = await DownloadDocumentAuthorApi(docId);
      const filePath = res.data.filePath;
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Failed to download file");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filePath.split("/").pop() || "download_file";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      await SaveDownLoadHistoryApi(fullname, docId);
      return filePath;
    } catch (error) {
      const res = error as AxiosError<{ message?: string }>;
      throw new Error(res.response?.data.message || res.message);
    }
  }
);
export const SaveDownLoadHistoryAction = createAsyncThunk<
  string,
  { fullname: string; documentId: number }
>(
  "DocumentSlice/SaveDownLoadHistoryAction",
  async ({ fullname, documentId }) => {
    try {
      const downloadRes = await DownloadDocumentAuthorApi(documentId);
      //post lên thông tin để máy chủ lưu lịch sử tải xuống
      await SaveDownLoadHistoryApi(fullname, documentId);
      return downloadRes.data.filePath;
    } catch (error) {
      const res = error as AxiosError<{ message?: string }>;
      throw new Error(res.response?.data.message || res.message);
    }
  }
);

export const DelectDocumentStogeAction = createAsyncThunk<string, number>(
  "DocumentSlice/DelectDocumentStogeAction",
  async (id: number) => {
    try {
      const response = await DelectDocumentStoge(id);
      return response as unknown as string;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.response?.data.message || error.message);
    }
  }
);

const initialState: InitialStateStyles = {
  loading: false,
  error: "",
  document: [],
  documentStoge: [],
};

export const DocumentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(getDocumentByID.pending, (state) => {
      //     state.loading = true;
      // })
      .addCase(GetDocumentStogeAction.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(DownloadDocumentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DelectDocumentStogeAction.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        GetDocumentStogeAction.fulfilled,
        (state, action: PayloadAction<documentState[]>) => {
          state.loading = false;
          state.documentStoge = action.payload;
        }
      )
      .addCase(
        DownloadDocumentAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = "";
          if (action.payload) {
            toast.success("Download success");
          }
        }
      )
      .addCase(DelectDocumentStogeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.success("Xóa tài liệu thanh công");
      })
      .addCase(GetDocumentStogeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Get Document Stoge Failed";
      })
      .addCase(DownloadDocumentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to download document";
      })
      .addCase(DelectDocumentStogeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete document";
      });
    // .addCase(getDocumentByID.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.document = action.payload;
    // })

    // .addCase(getDocumentByID.rejected, (state, action) => {
    //     state.loading = false;
    //     state.Error =
    //         action.error.message ||
    //         "error when i call api get book by id!";
    // })
  },
});

export default DocumentSlice.reducer;
