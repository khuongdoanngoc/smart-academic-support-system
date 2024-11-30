import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetDocumentByID } from "../../services/DocumentAPI/DocumentAPI";
import { DocumentResponse } from "./InterfaceResponse";

interface InitialStateStyles {
    Loading: boolean;
    Error: string;
    Document: DocumentResponse | undefined;
}

export const getDocumentByID = createAsyncThunk<DocumentResponse, number>(
    "getBookById",
    async (id: number) => {
        try {
            const response = await GetDocumentByID(id);
            return response.data as DocumentResponse;
        } catch (err: any) {
            throw Error(err.message);
        }
    }
);

const initialState: InitialStateStyles = {
    Loading: false,
    Error: "",
    Document: undefined,
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
                state.Document = action.payload;
            })
            .addCase(getDocumentByID.rejected, (state, action) => {
                state.Loading = false;
                state.Error =
                    action.error.message ||
                    "error when i call api get book by id!";
            });
    },
});

export default DocumentSlice.reducer;
