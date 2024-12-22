import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  hometown: string;
  phoneNumber: string;
  facultyId: number;
  major: string;
  enrollmentYear: number;
  classNumber: string;
  profilePicture: File | null;
}

export const EditProfileAPI = async (data: UpdateProfileRequest) => {
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("birthDate", data.birthDate);
  formData.append("gender", data.gender);
  formData.append("hometown", data.hometown);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("facultyId", data.facultyId?.toString());
  formData.append("major", data.major);
  formData.append("enrollmentYear", data.enrollmentYear.toString());
  formData.append("classNumber", data.classNumber);
  if (data.profilePicture) {
    formData.append("profilePicture", data.profilePicture);
  }
  try {
    const response = await axiosInstance.put(`/user/update-profile`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("API response:", response);
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data.message || error.message);
  }
};
