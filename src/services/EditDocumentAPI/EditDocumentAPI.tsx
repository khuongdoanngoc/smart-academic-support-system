import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

export interface EditDocument {
  docId: number;
  title: string;
  description: string;
  type: string;
  subjectName: string;
  facultyName: string;
}

export const EditDocumentAPI = async (data: EditDocument) => {
  try {
    const res = await axiosInstance.put(`/document/${data.docId}`, data);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
