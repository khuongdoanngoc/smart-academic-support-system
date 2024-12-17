import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    GetAllDocuments,
    GetDocumentByFalcuty,
    GetDocumentByFolder,
    GetDocumentByID,
    GetDocumentBySubject,
    GetDocumentByTitle,
} from "../../services/DocumentAPI/DocumentAPI";
import { DocumentResponse } from "./InterfaceResponse";

interface InitialStateStyles {
    Loading: boolean;
    Error: string;
    Documents: DocumentResponse[] | undefined;
    DocumentDetail: DocumentResponse | undefined;
}

export const getDocumentByID = createAsyncThunk<any, number>(
    "documents/getDocumentByID",
    async (id: number) => {
        try {
            const response: any = await GetDocumentByID(id);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

export const getAllDocuments = createAsyncThunk<any, number>(
    "documents/getAllDocuments",
    async (size: number) => {
        try {
            const response = await GetAllDocuments(size);
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
            .addCase(getDocumentByID.pending, (state) => {
                state.Loading = true;
            })
            .addCase(getDocumentByID.fulfilled, (state, action) => {
                state.Loading = false;
                state.DocumentDetail = action.payload;
            })
            .addCase(getDocumentByID.rejected, (state, action) => {
                state.Loading = false;
                state.Error =
                    action.error.message ||
                    "error when i call api get document by id!";
            })
            .addCase(getAllDocuments.pending, (state) => {
                state.Loading = true;
            })
            .addCase(getAllDocuments.fulfilled, (state, action) => {
                state.Loading = false;
                state.Documents = action.payload;
            })
            .addCase(getAllDocuments.rejected, (state, action) => {
                state.Loading = false;
                state.Error =
                    action.error.message ||
                    "error when calling api get all documents";
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
            });
    },
});

export default DocumentSlice.reducer;
