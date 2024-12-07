/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  postFile,
  SearchFaculty,
  searchFaculty,
  searchFolder,
  SearchFolder,
  searchSubject,
  SearchSubject,
} from "../../services/UploadFileAPI/UploadFileAPI";
import { AxiosError } from "axios";
export interface FileItem {
  name: string;
  size: number;
}

interface initState {
  loading: boolean;
  error: string | null;
  success: boolean | null;
  searchFaculty: SearchFaculty[];
  searchFolder: SearchFolder[];
  searchSubject: SearchSubject[];
}

const initialState: initState = {
  loading: false,
  error: "",
  success: false,
  searchFaculty: [],
  searchFolder: [],
  searchSubject: [],
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

export const SearchFacultyAction = createAsyncThunk<SearchFaculty[], string>(
  "SearchFacultyAction",
  async (facultyName: string) => {
    try {
      const response = await searchFaculty(facultyName);
      return response as unknown as SearchFaculty[];
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.message);
    }
  }
);

export const SearchFolderAction = createAsyncThunk<SearchFolder[], string>(
  "SearchFolderAction",
  async (folderName: string) => {
    try {
      const response = await searchFolder(folderName);
      return response as unknown as SearchFolder[];
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.message);
    }
  }
);

export const SearchSubjectAction = createAsyncThunk<SearchSubject[], string>(
  "SearchSubjectAction",
  async (subject: string) => {
    try {
      const response = await searchSubject(subject);
      console.log("response", response);

      return response as unknown as SearchSubject[];
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error.message);
    }
  }
);

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    clearSearchFaculty: (state) => {
      state.searchFaculty = [];
    },
    clearSearchFolder: (state) => {
      state.searchFolder = [];
    },
    clearSearchSubject: (state) => {
      state.searchSubject = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UploadFileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchFacultyAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchFolderAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchSubjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UploadFileAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("File uploaded successfully!");
      })
      .addCase(
        SearchFacultyAction.fulfilled,
        (state, action: PayloadAction<SearchFaculty[]>) => {
          state.loading = false;
          state.searchFaculty = action.payload;
        }
      )

      .addCase(
        SearchFolderAction.fulfilled,
        (state, action: PayloadAction<SearchFolder[]>) => {
          state.loading = false;
          state.searchFolder = action.payload;
        }
      )
      .addCase(
        SearchSubjectAction.fulfilled,
        (state, action: PayloadAction<SearchSubject[]>) => {
          state.loading = false;
          state.searchSubject = action.payload;
        }
      )
      .addCase(UploadFileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(SearchFacultyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchFaculty = [];
      })
      .addCase(SearchFolderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchFolder = [];
      })
      .addCase(SearchSubjectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchFolder = [];
      });
  },
});

export const { clearSearchFaculty, clearSearchFolder, clearSearchSubject } =
  uploadFileSlice.actions;
export default uploadFileSlice.reducer;
