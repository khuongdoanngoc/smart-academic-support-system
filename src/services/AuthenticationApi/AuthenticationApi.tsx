import { toast } from "react-toastify";
import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";
import { AxiosError } from "axios";

interface LoginData {
  username: string;
  password: string;
}
interface IRegister {
  email: string;
  row: string;
  password: string;
  confirmPassword: string;
}
export const LoginApi = async (data: LoginData): Promise<string> => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/auth/login`, data);
    if (res) {
      toast.success("Đăng nhập thành công");
      return data.username;
    }
    throw new Error("Đăng nhập thất bại");
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.status === 400) {
      toast.error("tài khoản hoặc mật khẩu không đúng!");
    }
    throw new Error("tài khoản hoặc mật khẩu không đúng!");
  }
};

export const RegisterApi = async (data: IRegister) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/auth/register`, data);
    toast.success("Đăng ký thành công");
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.status === 400) {
      toast.error(error.message);
    }
    throw new Error(error.message);
  }
};
export const LogoutApi = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/auth/logout`);
    if (res) {
      return;
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message);
  }
};
