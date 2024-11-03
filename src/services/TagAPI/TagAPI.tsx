import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export const CreateTag = async (tagName: string) => {
    try {
        const res = await axiosInstance.post(`${baseUrl}/tags/create`, tagName);
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
            `${baseUrl}/tags/update/${tagData.tagId}`,
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
            `${baseUrl}/tags/delete/${tagId}`
        );
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
