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

export const postFile = async (data: ApiPostFile) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("content", data.content);
  formData.append("type", data.type);
  formData.append("subject", data.subject);
  formData.append("facultyId", data.facultyId.toString());

  try {
    const res = await axiosInstance.post("/document/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      toast.success("File uploaded successfully!");
    }
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage =
      error.response?.data?.message || "An error occurred while uploading";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
