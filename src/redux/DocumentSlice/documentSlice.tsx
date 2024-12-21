/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  DelectDocumentStoge,
  // documentState,
  DownloadDocumentAuthorApi,
  GetDocumentStogeAPI,
  SaveDownLoadHistoryApi,
  GetAllDocuments,
  GetDocumentByFalcuty,
  GetDocumentByFolder,
  GetDocumentByID,
  GetDocumentBySubject,
  GetDocumentByTitle,
} from "../../services/DocumentAPI/DocumentAPI";
import { DocumentResponse } from "./InterfaceResponse";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface InitialStateStyles {
  Loading: boolean;
  Error: string;
  Documents: DocumentResponse[] | undefined;
  DocumentDetail: DocumentResponse | undefined;
  loading: boolean;
  error: string;
  document: DocumentResponse[];
  // documentStoge: documentState[];
}

export const getDocumentByIDAction = createAsyncThunk<DocumentResponse, number>(
  "getDocumentByIDAction",
  async (id: number) => {
    try {
      const response = await GetDocumentByID(id);
      return response as unknown as DocumentResponse;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new AxiosError(error.message);
    }
  }
);

export const GetDocumentStogeAction = createAsyncThunk<
  any,
  { pageSize: number; pageNum: number }
>("GetDocumentStogeAction", async ({ pageSize, pageNum }) => {
  try {
    const response = await GetDocumentStogeAPI(pageSize, pageNum);
    return response.data as any;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
});

export const DownloadDocumentAuthorAction = createAsyncThunk<string, number>(
  "DocumentSlice/DownloadDocumentAuthorAction",
  async (documentId: number) => {
    try {
      const res = await DownloadDocumentAuthorApi(documentId);
      return res.data.filePath;
    } catch (error) {
      const res = error as AxiosError<{ message?: string }>;
      throw new Error(res.response?.data.message || res.message);
    }
  }
);

export const DownloadDocumentAction = createAsyncThunk<
  string,
  { fullname: string; docId: number }
>("DocumentSlice/DownloadDocumentAuthorAction", async ({ fullname, docId }) => {
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
});
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

// export const getDocumentByID = createAsyncThunk<DocumentResponse, number>(
//   "documents/getDocumentByID",
//   async (id: number) => {
//     try {
//       const response: any = await GetDocumentByID(id);
//       return response as DocumentResponse;
//     } catch (err: any) {
//       throw Error(err.message);
//     }
//   }
// );


export const getAllDocumentsAction = createAsyncThunk<any>(
  "documents/getAllDocuments",
  async () => {
    try {
      const response = await GetAllDocuments();
      return response;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);


// Document Searches
export const getDocumentByTitle = createAsyncThunk<DocumentResponse, string>(
  "documents/getDocumentByTitle",
  async (title: string) => {
    try {
      const response = await GetDocumentByTitle(title);
      return response.data as DocumentResponse;
    } catch (err: any) {
      throw Error(err.message);
    }
  }
);
export const getDocumentBySubject = createAsyncThunk<DocumentResponse, string>(
  "documents/getDocumentBySubject",
  async (subject: string) => {
    try {
      const response = await GetDocumentBySubject(subject);
      return response.data as DocumentResponse;
    } catch (err: any) {
      throw Error(err.message);
    }
  }
);
export const getDocumentByFolder = createAsyncThunk<DocumentResponse, string>(
  "documents/getDocumentByFolder",
  async (folder: string) => {
    try {
      const response = await GetDocumentByFolder(folder);
      return response.data as DocumentResponse;
    } catch (err: any) {
      throw Error(err.message);
    }
  }
);
export const getDocumentByFalcuty = createAsyncThunk<DocumentResponse, string>(
  "documents/getDocumentByFalcuty",
  async (falcuty: string) => {
    try {
      const response = await GetDocumentByFalcuty(falcuty);
      return response.data as DocumentResponse;
    } catch (err: any) {
      throw Error(err.message);
    }
  }
);

const initialState: InitialStateStyles = {
  loading: false,
  error: "",
  document: [],
  // documentStoge: [],
  Loading: false,
  Error: "",
  Documents: [],
  DocumentDetail: undefined,
};

export const DocumentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDocumentByIDAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getDocumentByIDAction.fulfilled, (state, action) => {
        state.Loading = false;
        state.DocumentDetail = action.payload;
      })
      .addCase(getDocumentByIDAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "error when i call api get document by id!";
      })
      .addCase(getAllDocumentsAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getAllDocumentsAction.fulfilled, (state, action) => {
        state.Loading = false;
        state.Documents = action.payload;
      })
      .addCase(getAllDocumentsAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "error when calling api get all documents";
      })
      .addCase(getDocumentByTitle.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getDocumentByTitle.fulfilled, (state, action) => {
        state.Loading = false;
        state.DocumentDetail = action.payload;
      })
      .addCase(getDocumentByTitle.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message ||
          "error when calling api get document by title";
      })
      .addCase(getDocumentBySubject.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getDocumentBySubject.fulfilled, (state, action) => {
        state.Loading = false;
        state.DocumentDetail = action.payload;
      })
      .addCase(getDocumentBySubject.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message ||
          "error when calling api get document by subject";
      })
      .addCase(getDocumentByFolder.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getDocumentByFolder.fulfilled, (state, action) => {
        state.Loading = false;
        state.DocumentDetail = action.payload;
      })
      .addCase(getDocumentByFolder.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message ||
          "error when calling api get document by folder";
      })
      .addCase(getDocumentByFalcuty.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getDocumentByFalcuty.fulfilled, (state, action) => {
        state.Loading = false;
        state.DocumentDetail = action.payload;
      })
      .addCase(getDocumentByFalcuty.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message ||
          "error when calling api get document by falcuty";
      })
      .addCase(GetDocumentStogeAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DownloadDocumentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DelectDocumentStogeAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDocumentStogeAction.fulfilled, (state) => {
        state.loading = false;
        // state.documentStoge = action.payload;
      })
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
  },
});

export default DocumentSlice.reducer;
