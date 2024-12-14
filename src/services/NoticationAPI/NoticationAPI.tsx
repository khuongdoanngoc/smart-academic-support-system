/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/AxiosInterceptor";

interface DelectId {
  notificationId: number;
}
export interface NotificationResponse {
  notificationId: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const NoticationDelect = async (
  notificationId: DelectId
): Promise<AxiosResponse<number>> => {
  try {
    const res = await axiosInstance.post(`/read/${notificationId}`);
    return res;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.message || error.message);
  }
};

export const ListAllNotificationAPI = async (
  pageNum: number,
  pageSize: number
) => {
  try {
    const res = await axiosInstance.get(
      `/notification?pageNum=${pageNum}&pageSize=${pageSize}`
    );
    return res as unknown as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};
export const ListAllNotificationSavedAPI = async (
  pageNum: number,
  pageSize: number
) => {
  try {
    const res = await axiosInstance.get(
      `/notification/saved?pageNum=${pageNum}&pageSize=${pageSize}`
    );
    return res as unknown as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};
export const ListAllNotificationDeletedAPI = async (
  pageNum: number,
  pageSize: number
) => {
  try {
    const res = await axiosInstance.get(
      `/notification/deleted?pageNum=${pageNum}&pageSize=${pageSize}`
    );
    return res as unknown as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};

export const CountNotificationAPI = async () => {
  try {
    const res = await axiosInstance.get(`/notification/count`);
    return res;
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};

export const MoveNotifyToSavedAPI = async (notificationIds: number[]) => {
  try {
    const data = {
      notificationIds,
    };
    const res = await axiosInstance.post(
      `/notification/move-to-saved`,
      JSON.stringify(data)
    );
    return res as unknown as string;
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};

export const MoveNotifyToTrashAPI = async (notificationIds: number[]) => {
  try {
    const data = {
      notificationIds,
    };
    const res = await axiosInstance.post(
      `/notification/move-to-trash`,
      JSON.stringify(data)
    );
    return res as unknown as string;
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};

export const DeleteNotifyAPI = async (notificationIds: number[]) => {
  try {
    const data = {
      notificationIds,
    };
    const res = await axiosInstance.delete<string>(`/notification/delete`, {
      data,
    });
    return res as unknown as string;
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};

export const UpdateStatusNotiftyAPI = async (notificationIds: number[]) => {
  try {
    const data = {
      notificationIds,
    };
    const res = await axiosInstance.put(`/notification/read`,JSON.stringify(data));
    return res as unknown as string;
  } catch (error: any) {
    throw new Error(error.message || error.message);
  }
};