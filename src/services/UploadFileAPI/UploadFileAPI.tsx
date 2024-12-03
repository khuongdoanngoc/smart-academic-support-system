import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
import { toast } from "react-toastify";

interface ApiPostFile {
  file: File;
  title: string;
  description: string;
  content: string;
  type: string;
  subject: string;
  facultyId: number;
}
export interface SearchFaculty {
  id: number;
  facultyName: string;
}
export interface SearchFolder {
  id: number;
  title: string;
}
export interface SearchSubject {
  id: number;
  subject: string;
}
export const postFile = async (data: ApiPostFile) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("content", data.content);
  formData.append("type", data.type);
  formData.append("subject", data.subject);
  formData.append("facultyId", data.facultyId.toString());
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
export const searchFaculty = async (data: string) => {
  try {
    const res = await axiosInstance.get<SearchFaculty[]>(
      `/search/faculty?facultyName=${encodeURIComponent(data)}`
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

export const searchFolder = async (data: string) => {
  try {
    const res = await axiosInstance.get<SearchFolder[]>(
      `/search/folder?folderName=${encodeURIComponent(data)}`
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
