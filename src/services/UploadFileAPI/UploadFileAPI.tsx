import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
import { toast } from "react-toastify";

interface ApiPostFile {
  file: File;
  title: string;
  description: string;
  type: string;
  subjectCode: string;
  facultyName: string;
}
export interface SearchFaculty {
  facultyId: number;
  facultyName: string;
}
export interface SearchFolder {
  id: number;
  folderName: string;
}
export interface SearchSubject {
  subjectCode: string;
  subjectName: string;
}
export const postFile = async (data: ApiPostFile) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("subjectCode", data.subjectCode);
  formData.append("facultyName", data.facultyName);
  console.log("formData", formData);

  try {
    const res = await axiosInstance.post("/document/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
export const searchFacultyAPI = async (data: string) => {
  try {
    const res = await axiosInstance.get<SearchFaculty[]>(
      `/search/faculty?facultyName=${data}`
    );
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while searching faculty";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const searchFolderAPI = async () => {
  try {
    const res = await axiosInstance.get(`/folder/all`);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while searching faculty";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const searchSubject = async (data: string) => {
  try {
    const res = await axiosInstance.get<SearchSubject[]>(
      `/search/subject?subject=${encodeURIComponent(data)}`
    );

    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while searching faculty";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
