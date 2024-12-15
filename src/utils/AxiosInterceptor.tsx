import axios from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import {  LogoutAction, updateStateLoading } from "../redux/AuthenticationSlice/AuthenticationSlice";
import { toast } from "react-toastify";
export const baseUrl = import.meta.env.VITE_APP_API_URL;
interface response {
    token: string;
    refreshToken: string;
}
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
let refreshTokePromise: Promise<unknown> | null = null;
let isRefreshingToken = false;
const callRefreshToken = async (): Promise<void> => {
  if (!isRefreshingToken) {
    store.dispatch(updateStateLoading(true))
    isRefreshingToken = true;
    await axiosInstance.get<void, response>("/auth/refresh-token");
    isRefreshingToken = false;
    // store.dispatch(updateStateLoading(false));
  }
};
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken: string | undefined = Cookies.get("accessToken");
        if (accessToken === undefined || accessToken.length === 0) {
            config.headers.Authorization = null;
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshTokePromise) {
        
        // Gọi refreshToken và lưu promise vào biến refreshPromise
        refreshTokePromise = callRefreshToken();
      }
      try {
        await refreshTokePromise;
        refreshTokePromise = null;
        // store.dispatch(updateStateLoading(false));
        return axiosInstance(originalRequest);
      } catch (err) {
        refreshTokePromise = null;
        return Promise.reject(err);
      }
    }
    if (err.response.status === 401) {
      store.dispatch(updateStateLoading(false))
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        // call logout function or handle accordingly
        
        store.dispatch(LogoutAction());
        err.response.message = "Vui lòng đăng nhập lại";
      }
      toast.error("Please login to access",{autoClose:3000});
      setTimeout(()=>{
        window.location.href="/login";
      },3000);
      err.response.message = "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại";
      return Promise.reject(err.response);
    }
    if (err.response) {
      return Promise.reject(err.response);
    }
    if (err.request) {
      return Promise.reject(err.request);
    }
    return Promise.reject(err.message);
  }
);
