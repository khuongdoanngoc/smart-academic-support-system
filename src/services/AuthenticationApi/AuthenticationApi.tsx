import { axiosInstance } from "../../utils/AxiosInterceptor";
import { AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}
interface ILoginS {
  listRoles: string[];
  accessToken: string;
  refreshToken: string;
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
    return res as unknown as ILoginS;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Đăng nhập thất bại");
  }
};

export const RegisterApi = async (data: IRegister) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;

    throw new Error(error.response?.data.message || error.message);
  }
};
export const LogoutApi = async () => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    if (res) {
      return;
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message);
  }
};

export const AutoLoginApi= async ()=>{
  try{
    const res= await axiosInstance.get("/auth/autoLogin");
    return res;
  }catch(err:unknown){
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message);
  }
}
