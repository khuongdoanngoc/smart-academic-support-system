import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetDocumentsForAdmin } from "../../services/AdminDashboardAPI/AdminDashboardAPI";

export const getDocumentsForAdmin = createAsyncThunk<any>(
    "adminDashboard/getDocuments",
    async () => {
        try {
            const res = await GetDocumentsForAdmin();
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const getUsersForAdmin = createAsyncThunk<any>(
    "adminDashboard/getDocuments",
    async () => {
        try {
            const res = await GetDocumentsForAdmin();
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

interface InitialStateStyles {
    loading: boolean;
    error: string;
    users: any[];
    documents: any[];
}

const initialState = {
    loading: false,
    error: "",
    users: [],
    documents: [],
};

export const AdminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getDocumentsForAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDocumentsForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.documents = action.payload;
            })
            .addCase(getDocumentsForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get documents for admin!";
            })
            .addCase(getUsersForAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsersForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get documents for admin!";
            });
    },
});
