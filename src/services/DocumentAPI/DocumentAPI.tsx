/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

// export interface DocumentStorage {
//   saveId: number;
//   title: string;
// }

export interface GetDocument {
  docId: number;
  title: string;
  filePath: string;
}

export const GetDocumentByID = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/document/${id}`);
    return res;
  } catch (error: any) {
    if (error) {
      throw new Error(error.message);
    }
  }
};

export const GetAllDocuments = async () => {
  try {
    const res = await axiosInstance.get("/document/all");
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetDocumentByTitle = async (title: string) => {
  try {
    const res = await axiosInstance.get(`/search/${title}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetDocumentBySubject = async (subject: string) => {
  try {
    const res = await axiosInstance.get(`/search/${subject}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetDocumentByFolder = async (folder: string) => {
  try {
    const res = await axiosInstance.get(`/search/${folder}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export const GetDocumentByFalcuty = async (falcuty: string) => {
//     try {
//         const res = await axiosInstance.get(baseUrl + `/search/${falcuty}`);
//         return res;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

export const GetDocumentByFalcuty = async (falcuty: string) => {
  try {
    const res = await axiosInstance.get(`/search/${falcuty}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetDocumentStogeAPI = async (
  size: number = 3,
  page: number = 3
) => {
  try {
    const response = await axiosInstance.get<any>(`document/all`, {
      params: { page, size },
    });
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};

export const GetDocumentSizeAPI = async (
  pageNum: number,
  pageSize: number = 10
) => {
  try {
    const response = await axiosInstance.get<any>(`document/account`, {
      params: { pageSize, pageNum },
    });
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};

export const DownloadDocumentAuthorApi = async (docId: number) => {
  try {
    const response = await axiosInstance.get(`/download/${docId}`, {
      responseType: "text", // Chỉ định kiểu phản hồi là plain text
    });

    console.log("Direct Response from API:", response); // Log toàn bộ response
    return response; // Trả về toàn bộ response
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const SaveDownLoadHistoryApi = async (
  username: string,
  docId: number
) => {
  try {
    const res = await axiosInstance.post(
      `/history/track`,
      null, // Body là `null` vì dữ liệu được truyền qua query string
      {
        params: {
          docId,
          username,
        },
      }
    );
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};

export const DelectDocumentStoge = async (docId: number) => {
  try {
    const res = await axiosInstance.delete(`/saved-documents/delete/${docId}`);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
