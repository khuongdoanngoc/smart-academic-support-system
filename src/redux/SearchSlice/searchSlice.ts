import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    SearchDocumentByFaculty,
    SearchDocumentByFolder,
    SearchDocumentBySubject,
    SearchDocumentByTitle,
} from "../../services/SearchAPI/SearchAPI";

export const searchDocumentByTitle = createAsyncThunk<any[], string>(
    "search/searchDocumentByTitle",
    async (title: string) => {
        try {
            const response: any = await SearchDocumentByTitle(title);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

export const searchDocumentByFolder = createAsyncThunk<any[], string>(
    "search/searchDocumentByFolder",
    async (folderName: string) => {
        try {
            const response: any = await SearchDocumentByFolder(folderName);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

export const searchDocumentBySubject = createAsyncThunk<any[], string>(
    "search/searchDocumentBySubject",
    async (subject: string) => {
        try {
            const response: any = await SearchDocumentBySubject(subject);
            return response;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

export const searchDocumentByFaculty = createAsyncThunk<any[], string>(
    "search/searchDocumentByFaculty",
    async (faculty: string) => {
        try {
            const response: any = await SearchDocumentByFaculty(faculty);
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
}
const initialState: InitialStateStyles = {
    loading: false,
    error: null,
    data: [], // Hoặc dữ liệu mặc định
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(searchDocumentByTitle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchDocumentByTitle.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(searchDocumentByTitle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(searchDocumentBySubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchDocumentBySubject.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(searchDocumentBySubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(searchDocumentByFolder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchDocumentByFolder.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(searchDocumentByFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(searchDocumentByFaculty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchDocumentByFaculty.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(searchDocumentByFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
    },
});

export default searchSlice.reducer;
