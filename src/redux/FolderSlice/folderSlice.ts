import { createAsyncThunk } from "@reduxjs/toolkit";
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

interface InitialStateStyles {
    Loading: boolean;
    Error: string | null;
    Folders: IFolder[];
}

const getAllFolders = createAsyncThunk<IFolder[]>(
    "folder/getAllFolders",
    async () => {
        const res = await GetAllFolders();
        return res.data;
    }
);

const createFolder = createAsyncThunk<IFolder, string>(
    "folder/createFolder",
    async (folderName: string) => {
        const res = await CreateFolder(folderName);
        return res.data;
    }
);

// const updateFolder = createAsyncThunk<IFolder, IFolder>('folder/updateFolder', async (folderId: number, folderName: string) => {
//     const res = await UpdateFolder(folderId, folderName);
//     return res.data;
// })

const deleteFolder = async (folderId: number) => {
    const res = await DeleteFolder(folderId);
    return res.data;
};
