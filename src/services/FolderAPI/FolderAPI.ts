import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export const GetAllFolders = async () => {
    try {
        const res = await axiosInstance.get(`${baseUrl}/folder/all`);
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const CreateFolder = async (folderName: string) => {
    try {
        const res = await axiosInstance.post(
            `${baseUrl}/folder/create?folderName=${folderName}`
        );
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const UpdateFolder = async (folderId: number, folderName: string) => {
    try {
        const res = await axiosInstance.put(
            `${baseUrl}/folder/update/${folderId}?folderName=${folderName}`
        );
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const DeleteFolder = async (folderId: number) => {
    try {
        const res = await axiosInstance.delete(
            `${baseUrl}/folder/delete/${folderId}`
        );
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};
