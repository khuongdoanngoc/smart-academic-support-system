/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    ApproveDocuments,
    ApproveUsers,
    CheckDocument,
    DeleteDocuments,
    DeleteUsers,
    GetDocumentsForAdmin,
    GetStatsForAdmin,
    GetUsersForAdmin,
} from "../../services/AdminDashboardAPI/AdminDashboardAPI";

export const getDocumentsForAdmin = createAsyncThunk<any, number>(
    "adminDashboard/getDocuments",
    async (size: number) => {
        try {
            const res = await GetDocumentsForAdmin(size);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const getUsersForAdmin = createAsyncThunk<any, number>(
    "adminDashboard/getUsers",
    async (size: number) => {
        try {
            const res = await GetUsersForAdmin(size);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const getStatsForAdmin = createAsyncThunk<any>(
    "adminDashboard/getStats",
    async () => {
        try {
            const res = await GetStatsForAdmin();
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const deleteUsers = createAsyncThunk<any, any[]>(
    "adminDashboard/deleteUsers",
    async (accountIds) => {
        try {
            const res = await DeleteUsers(accountIds);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const deleteDocuments = createAsyncThunk<any, any[]>(
    "adminDashboard/deleteDocuments",
    async (accountIds) => {
        try {
            const res = await DeleteDocuments(accountIds);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const approveUsers = createAsyncThunk<any, any[]>(
    "adminDashboard/approveUsers",
    async (accountIds) => {
        try {
            const res = await ApproveUsers(accountIds);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const approveDocuments = createAsyncThunk<any, any[]>(
    "adminDashboard/approveDocuments",
    async (documentIds) => {
        try {
            const res = await ApproveDocuments(documentIds);
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const checkDocument = createAsyncThunk<any, number>(
    "adminDashboard/checkDocument",
    async (documentId) => {
        try {
            const res = await CheckDocument(documentId);
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
    data: any[];
    successMessage: string;
}

const initialState: InitialStateStyles = {
    loading: false,
    error: "",
    users: [],
    documents: [],
    data: [],
    successMessage: "",
};

export const AdminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = "";
        },
        clearMessage: (state) => {
            state.successMessage = "";
        },
    },
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
                    "error when i call api get users for admin!";
            })
            .addCase(getStatsForAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStatsForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getStatsForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get stats for admin!";
            })
            .addCase(deleteUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUsers.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Xoá thành công!";
            })
            .addCase(deleteUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get documents for admin!";
            })
            .addCase(deleteDocuments.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDocuments.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Xoá thành công!";
            })
            .addCase(deleteDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get documents for admin!";
            })
            .addCase(approveUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(approveUsers.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Phê duyệt tài khoản thành công!";
            })
            .addCase(approveUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "error when i call api get stats for admin!";
            })
            .addCase(approveDocuments.pending, (state) => {
                state.loading = true;
            })
            .addCase(approveDocuments.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Phê duyệt tài liệu thành công!";
            })
            .addCase(approveDocuments.rejected, (state) => {
                state.loading = false;
                state.error = "Tài liệu cần được kiểm tra!";
            })
            .addCase(checkDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkDocument.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Kiểm tra tài liệu thành công!";
            })
            .addCase(checkDocument.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                
                state.error =
                    action.error.message || "Tài liệu chứa từ nhạy cảm hoặc đã được check!";
            });
    },
});

export default AdminDashboardSlice.reducer;

export const { clearError, clearMessage } = AdminDashboardSlice.actions;
