import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export const GetAllFolders = async () => {
    try {
        const res = await axiosInstance.get(`${baseUrl}/folder/all`);
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const CreateFolder = async (folderName: string, description: string) => {
    try {
        const res = await axiosInstance.post(`${baseUrl}/folder/create`, {
            folderName,
            description,
        });
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const GetFolderById = async (id: number) => {
    try {
        const res = await axiosInstance.get(`${baseUrl}/folder/${id}?`);
        return res;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const UpdateFolder = async (
    folderId: number,
    folderName: string,
    description: string
) => {
    try {
        const res = await axiosInstance.put(
            `${baseUrl}/folder/update/${folderId}`,
            {
                folderName,
                description,
            }
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

export const GetPopularFolders = async (size: number) => {
    try {
        const res = await axiosInstance.get(
            `/folder/top-folders?size=${size}`
        );
        return res;
    } catch (err: any) {
        throw Error(err.message);
    }
};
