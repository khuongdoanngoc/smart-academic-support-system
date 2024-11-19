import { toast } from "react-toastify";
import { axiosInstance, baseUrl } from "../../utils/AxiosInterceptor";
import { AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}
interface ILoginS {
  listRoles: string[];
  username: string;
}
interface IRegister {
  email: string;
  password: string;
  roleName: string;
}
export const LoginApi = async (data: LoginData): Promise<ILoginS> => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    if (res) {
      toast.success("Đăng nhập thành công");
      return res as unknown as ILoginS;
    }
    throw new Error("Đăng nhập thất bại");
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("tài khoản hoặc mật khẩu không đúng!");
  }
};

export const RegisterApi = async (data: IRegister) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    if (res) {
      toast.success("Đăng ký tài khoản thành công công!");
    }

    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.status === 400) {
      toast.error(error.response.data.message || "An error occurred");
    } else {
      toast.error("An unexpected error occurred");
    }
    throw new Error(error.response?.data.message || error.message);
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
