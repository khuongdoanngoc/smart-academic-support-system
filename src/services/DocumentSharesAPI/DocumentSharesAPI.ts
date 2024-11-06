import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export interface IShareDocument {
    documentId: number;
    folderId: number;
    email: string;
    shareUrl: string;
}

export const ShareDocument = async (data: IShareDocument) => {
    try {
        const res = await axiosInstance.post(baseUrl + "/shares/email", data);
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};
