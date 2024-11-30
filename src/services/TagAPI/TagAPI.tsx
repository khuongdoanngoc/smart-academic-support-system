import { axiosInstance } from "../../utils/AxiosInterceptor";

export const CreateTag = async (tagName: string) => {
    try {
        const res = await axiosInstance.post(`/tags/create`, tagName);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const UpdateTag = async (tagData: {
    tagName: string;
    tagId: number;
}) => {
    try {
        const res = await axiosInstance.put(
            `/tags/update/${tagData.tagId}`,
            tagData
        );
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const DeleteTag = async (tagId: number) => {
    try {
        const res = await axiosInstance.delete(
            `/tags/delete/${tagId}`
        );
        return res;
    } catch (error: unknown) {
        throw new Error(error.message);
    }
};
