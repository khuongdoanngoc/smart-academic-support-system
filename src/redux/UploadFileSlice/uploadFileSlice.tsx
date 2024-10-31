import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/AxiosInterceptor";
import { toast } from "react-toastify";
// import { AxiosError } from "axios";
import { postFile } from "../../services/UploadFileAPI/UploadFileAPI";
import { AxiosError } from "axios";
export interface FileItem {
  name: string;
  size: number;
}

interface FileUploadState {
  valueRow: string;
  valueRowYear: string;
  fileList: FileItem[];
  specialized: string;
  subject: string;
  folder: string;
  documentType: string;
  title: string;
  academicYear: string;
  description: string;
}
interface initState {
  loading: boolean;
  error: string | null;
  fileUploadState: FileUploadState;
}

const initialState: initState = {
  loading: false,
  error: "",
  fileUploadState: {
    valueRow: "",
    valueRowYear: "",
    fileList: [],
    specialized: "",
    subject: "",
    folder: "",
    documentType: "",
    title: "",
    academicYear: "",
    description: "",
  },
};
interface ApiPostFile {
  file: File;
  title: string;
  description: string;
  content: string;
  type: string;
  subject: string;
  facultyId: number;
}

export const UploadFileAction = createAsyncThunk<
  string | undefined,
  ApiPostFile
>("UploadFileAction", async (data: ApiPostFile) => {
  try {
    const response = await postFile(data);
    if (response !== undefined) {
      toast.success("Login account successfully");
      return response as unknown as string;
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage =
      error.response?.data?.message || "An error occurred while uploading";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
});

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    setFileList: (state, action: PayloadAction<FileItem[]>) => {
      state.fileUploadState.fileList = action.payload;
    },

    setValueRow: (state, action: PayloadAction<string>) => {
      state.fileUploadState.valueRow = action.payload;
    },
    setvalueRowYear: (state, action: PayloadAction<string>) => {
      state.fileUploadState.valueRowYear = action.payload;
    },
    setSpecialized: (state, action: PayloadAction<string>) => {
      state.fileUploadState.specialized = action.payload;
    },

    setSubject: (state, action: PayloadAction<string>) => {
      state.fileUploadState.subject = action.payload;
    },
    setFolder: (state, action: PayloadAction<string>) => {
      state.fileUploadState.folder = action.payload;
    },
    setDocumentType: (state, action: PayloadAction<string>) => {
      state.fileUploadState.documentType = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.fileUploadState.title = action.payload;
    },
    setAcademicYear: (state, action: PayloadAction<string>) => {
      state.fileUploadState.academicYear = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.fileUploadState.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UploadFileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UploadFileAction.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          console.log(action.payload);

          toast.success("File uploaded successfully!");
        }
      )
      .addCase(UploadFileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFileList,
  setValueRow,
  setvalueRowYear,
  setSpecialized,
  setSubject,
  setFolder,
  setDocumentType,
  setTitle,
  setAcademicYear,
  setDescription,
} = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
