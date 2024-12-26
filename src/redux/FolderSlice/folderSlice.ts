import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CreateFolder,
    DeleteFolder,
    GetAllFolders,
    GetFolderById,
    GetPopularFolders,
    UpdateFolder,
} from "../../services/FolderAPI/FolderAPI";

export const getAllFolders = createAsyncThunk<any>(
    "folder/getAllFolders",
    async () => {
        const res = await GetAllFolders();
        return res;
    }
);

interface FolderCreateDTO {
    folderName: string;
    description: string;
}

interface FolderUpdateDTO {
    folderId: number;
    folderName: string;
    description: string;
}

export const createFolder = createAsyncThunk<any, FolderCreateDTO>(
    "folder/createFolder",
    async (params: { folderName: string; description: string }) => {
        const res = await CreateFolder(params.folderName, params.description);
        return res;
    }
);

export const getFolderById = createAsyncThunk<any, number>(
    "folder/getFolderById",
    async (id: number) => {
        const res = await GetFolderById(id);
        return res;
    }
);

export const updateFolder = createAsyncThunk<any, FolderUpdateDTO>(
    "folder/updateFolder",
    async (params: {
        folderId: number;
        folderName: string;
        description: string;
    }) => {
        const res = await UpdateFolder(
            params.folderId,
            params.folderName,
            params.description
        );
        return res;
    }
);

export const deleteFolder = createAsyncThunk<any, number>(
    "folder/deleteFolder",
    async (id: number) => {
        try {
            const response = await DeleteFolder(id);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

export const getPopularFolders = createAsyncThunk<any, number>(
    "folder/getPopularFolders",
    async (size: number) => {
        try {
            const response = await GetPopularFolders(size);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

interface InitialStateStyles {
    loading: boolean;
    error: string | null;
    data: any;
    successMessage: string;
}
const initialState: InitialStateStyles = {
    loading: false,
    error: null,
    data: [], // Hoặc dữ liệu mặc định
    successMessage: "",
};

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.successMessage = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(updateFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(updateFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(getFolderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFolderById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getFolderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(getAllFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllFolders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(deleteFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFolder.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Xoá thư mục thành công!";
            })
            .addCase(deleteFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(getPopularFolders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPopularFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPopularFolders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
    },
});

export default folderSlice.reducer;
export const { clearError, clearMessage } = folderSlice.actions;
