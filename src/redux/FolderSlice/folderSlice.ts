import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CreateFolder,
    DeleteFolder,
    GetAllFolders,
    UpdateFolder,
} from "../../services/FolderAPI/FolderAPI";

interface IFolder {
    folderName: string;
    folderDescription: string;
}

const getAllFolders = createAsyncThunk<any>(
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

const updateFolder = createAsyncThunk<any, FolderUpdateDTO>(
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

const deleteFolder = async (folderId: number) => {
    const res = await DeleteFolder(folderId);
    return res.data;
};

interface InitialStateStyles {
    loading: boolean;
    error: string | null;
    data: any;
}
const initialState: InitialStateStyles = {
    loading: false,
    error: null,
    data: [], // Hoặc dữ liệu mặc định
};

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {},
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
            });
    },
});

export default folderSlice.reducer;
