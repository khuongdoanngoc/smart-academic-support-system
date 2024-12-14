import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";

export const SearchDocumentByTitle = async (title: string) => {
    try {
        const res = await axiosInstance.get(
            baseUrl + `/search/title?title=${title}`
        );
        return res;
    } catch (error: any) {
        if (error) {
            throw new Error(error.message);
        }
    }
};

export const SearchDocumentBySubject = async (subject: string) => {
    try {
        const res = await axiosInstance.get(
            baseUrl + `/search/subject?subject=${subject}`
        );
        return res;
    } catch (error: any) {
        if (error) {
            throw new Error(error.message);
        }
    }
};

export const SearchDocumentByFolder = async (folderName: string) => {
    try {
        const res = await axiosInstance.get(
            baseUrl + `/search/folder?folderName=${folderName}`
        );
        return res;
    } catch (error: any) {
        if (error) {
            throw new Error(error.message);
        }
    }
};

export const SearchDocumentByFaculty = async (faculty: string) => {
    try {
        const res = await axiosInstance.get(
            baseUrl + `/search/faculty?facultyName=${faculty}`
        );
        return res;
    } catch (error: any) {
        if (error) {
            throw new Error(error.message);
        }
    }
};
