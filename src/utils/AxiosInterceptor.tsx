import axios from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import {
  logout,
  updateToken,
} from "../redux/AuthenticationSlice/AuthenticationSlice";
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
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const callRefreshToken = async (): Promise<void> => {
  if (!isRefreshing) {
    isRefreshing = true;
    await axiosInstance.get<void, response>("/auth/refreshToken");
    isRefreshing = false;
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
    if (err.response.status === 403) {
      if (!refreshPromise) {
        // Gọi refreshToken và lưu promise vào biến refreshPromise
        refreshPromise = callRefreshToken();
      }
      // Chờ refreshToken hoàn thành trước khi thực hiện lại request gốc
      await refreshPromise;

      // Sau khi refreshToken hoàn thành, reset biến refreshPromise
      refreshPromise = null;

      // Gọi lại API gốc với AccessToken mới
      return axios.request(err.config);
    }
    if (err.response.status === 401 || originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = store.getState().authentication.refreshToken;
        const response = await axios.post("/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        store.dispatch(updateToken({ accessToken }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
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
