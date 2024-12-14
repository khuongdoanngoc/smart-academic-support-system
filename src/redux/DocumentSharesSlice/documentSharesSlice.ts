import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    IShareDocument,
    ShareDocument,
} from "../../services/DocumentSharesAPI/DocumentSharesAPI";

interface InitialStateStyles {
    Loading: boolean;
    Error: string;
    Share: IShareDocument | undefined;
}

export const shareDocument = createAsyncThunk<IShareDocument, IShareDocument>(
    "share/shareDocument",
    async (data: IShareDocument) => {
        try {
            const response = await ShareDocument(data);
            return response.data as IShareDocument;
        } catch (error: any) {
            throw Error(error.message);
        }
    }
);

const initialState: InitialStateStyles = {
    Loading: false,
    Error: "",
    Share: undefined,
};

const documentSharesSlice = createSlice({
    name: "documentShares",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase;
    },
});
