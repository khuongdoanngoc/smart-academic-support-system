import { axiosInstance } from "../../utils/AxiosInterceptor";

export const GetDocumentsForAdmin = async (size: number) => {
    try {
        const res = await axiosInstance.get(
            "/admin/dashboard/documents?size=" + size
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const GetUsersForAdmin = async (size: number) => {
    try {
        const res = await axiosInstance.get(
            "/admin/dashboard/users?size=" + size
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const GetStatsForAdmin = async () => {
    try {
        const res = await axiosInstance.get("/admin/dashboard/stats");
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const DeleteUsers = async (accountIds: any) => {
    try {
        const res = await axiosInstance.delete(
            "/admin/dashboard/delete-users",
            {
                data: accountIds,
            }
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const DeleteDocuments = async (accountIds: any) => {
    try {
        const res = await axiosInstance.delete(
            "/admin/dashboard/document",
            {
                data: accountIds,
            }
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const ApproveUsers = async (accountIds: any) => {
    try {
        const res = await axiosInstance.post(
            "/admin/dashboard/users/approve",
            accountIds
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const ApproveDocuments = async (accountIds: any) => {
    try {
        const res = await axiosInstance.post(
            "/admin/dashboard/documents/approve",
            accountIds
        );
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
};
