/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CountNotificationAPI,
  DeleteNotifyAPI,
  ListAllNotificationAPI,
  ListAllNotificationDeletedAPI,
  ListAllNotificationSavedAPI,
  MoveNotifyToSavedAPI,
  MoveNotifyToTrashAPI,
  NotificationResponse,
  UpdateStatusNotiftyAPI,
} from "../../services/NoticationAPI/NoticationAPI";

export const ListAllNotificationAction = createAsyncThunk<
  NotificationResponse[],
  number
>("ListAllNotificationAction", async (pageNum: number) => {
  try {
    const response = await ListAllNotificationAPI(pageNum, 5);
    return response as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});
export const ListAllNotificationSavedAction = createAsyncThunk<
  NotificationResponse[],
  number
>("ListAllNotificationSavedAction", async (pageNum: number) => {
  try {
    const response = await ListAllNotificationSavedAPI(pageNum, 5);
    return response as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});
export const ListAllNotificationDeletedAction = createAsyncThunk<
  NotificationResponse[],
  number
>("ListAllNotificationDeletedAction", async (pageNum: number) => {
  try {
    const response = await ListAllNotificationDeletedAPI(pageNum, 5);
    return response as NotificationResponse[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});
export const CountNotificationAction = createAsyncThunk<any>(
  "CountNotificationAction",
  async () => {
    try {
      const response = await CountNotificationAPI();
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const MoveNotifyToSavedAction = createAsyncThunk<string, number[]>(
  "MoveNotifyToSavedAction",
  async (notificationIds: number[]) => {
    try {
      const response = await MoveNotifyToSavedAPI(notificationIds);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const MoveNotifyToTrashdAction = createAsyncThunk<string, number[]>(
  "MoveNotifyToTrashdAction",
  async (notificationIds: number[]) => {
    try {
      const response = await MoveNotifyToTrashAPI(notificationIds);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const DeleteNotificationAction = createAsyncThunk<string,number[]>(
  "DeleteNotificationAction",
  async (notificationIds: number[]) => {
    try {
      const reponse = await DeleteNotifyAPI(notificationIds);
      return reponse;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message);
      throw Error(error.message);
    }
  }
);

export const UpdateStatusNotifyAction = createAsyncThunk<string,number[]>(
  "UpdateStatusNotifyAction",
  async (notificationIds: number[]) => {
    try {
      const reponse = await UpdateStatusNotiftyAPI(notificationIds);
      return reponse;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message);
      throw Error(error.message);
    }
  }
);

interface initNotication {
  Loading: boolean;
  LoadingRead: boolean;
  Error: string;
  notificationList: NotificationResponse[];
  numberOfNotifications: number;
  numberOfNotificationsSaved: number;
  numberOfNotificationsDelete: number;
  numberOfNotificationsUnRead: number;
  id: number;
}
const initialState: initNotication = {
  Loading: false,
  Error: "",
  id: 0,
  notificationList: [],
  numberOfNotifications: 0,
  numberOfNotificationsSaved: 0,
  numberOfNotificationsDelete: 0,
  numberOfNotificationsUnRead: 0,
  LoadingRead: false
};

const NoticationSlice = createSlice({
  name: "Notication",
  initialState,
  reducers: {
    updateNotification: (state, action) => {
      if(state.notificationList.length > 0) {
        state.notificationList[0]=action.payload;
      }else{
        state.notificationList = [...state.notificationList, action.payload];
      }
      
    },
    updateNumberOfNotificationsAll: (state, action) => {
      state.numberOfNotifications = action.payload;
    },
    updateNumberOfNotificationsSaved: (state, action) => {
      state.numberOfNotificationsSaved = action.payload;
    },
    updateNumberOfNotificationsTrash: (state, action) => {
      state.numberOfNotificationsDelete = action.payload;
    },
    updateNumberOfNotificationsUnRead: (state, action) => {
      state.numberOfNotificationsUnRead = action.payload;
    },
    updateNotificationList: (state,action:PayloadAction<number[]>)=>{
      state.notificationList = state.notificationList.filter((notification)=>{
        return!action.payload.includes(notification.notificationId);
      })
    },
    updateStatusReadNotifications: (state,action:PayloadAction<number[]>) =>{
      state.notificationList = state.notificationList.map((notification)=>{
        if(action.payload.includes(notification.notificationId)){
          notification.isRead = true;
        }
        return notification;
      })
      state.numberOfNotificationsUnRead = state.numberOfNotificationsUnRead-action.payload.length;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteNotificationAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(ListAllNotificationAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(ListAllNotificationSavedAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(ListAllNotificationDeletedAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(CountNotificationAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(MoveNotifyToSavedAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(MoveNotifyToTrashdAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(UpdateStatusNotifyAction.pending, (state) => {
        state.LoadingRead = true;
      })
      .addCase(DeleteNotificationAction.fulfilled, (state,action:PayloadAction<string>) => {
        state.Loading = false;
        toast.success(action.payload);
      })
      .addCase(
        ListAllNotificationAction.fulfilled,
        (state, action: PayloadAction<NotificationResponse[]>) => {
          state.Loading = false;
          state.notificationList = action.payload;
        }
      )
      .addCase(
        ListAllNotificationSavedAction.fulfilled,
        (state, action: PayloadAction<NotificationResponse[]>) => {
          state.Loading = false;
          state.notificationList = action.payload;
        }
      )
      .addCase(
        ListAllNotificationDeletedAction.fulfilled,
        (state, action: PayloadAction<NotificationResponse[]>) => {
          state.Loading = false;
          state.notificationList = action.payload;
        }
      )
      .addCase(CountNotificationAction.fulfilled, (state, action) => {
        state.Loading = false;
        state.numberOfNotifications = action.payload.total;
        state.numberOfNotificationsSaved = action.payload.saved;
        state.numberOfNotificationsDelete = action.payload.deleted;
        state.numberOfNotificationsUnRead= action.payload.unRead;
      })
      .addCase(
        MoveNotifyToSavedAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.Loading = false;
          toast.success(action.payload);
        }
      )
      .addCase(
        MoveNotifyToTrashdAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.Loading = false;
          toast.success(action.payload);
        }
      )
      .addCase(
        UpdateStatusNotifyAction.fulfilled,
        (state) => {
          state.LoadingRead = false;
        }
      )
      .addCase(DeleteNotificationAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.error.message || "Delete notify Failed";
      })
      .addCase(ListAllNotificationAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.error.message || "get all notifications failed";
      })
      .addCase(ListAllNotificationSavedAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "get all notifications is saved failed";
      })
      .addCase(ListAllNotificationDeletedAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "get all notifications is deleted failed";
      })
      .addCase(CountNotificationAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.error.message || "count notifications failed";
      })
      .addCase(MoveNotifyToSavedAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "move notifications to saved failed";
      })
      .addCase(MoveNotifyToTrashdAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error =
          action.error.message || "move notifications to trash failed";
      })
      .addCase(UpdateStatusNotifyAction.rejected, (state, action) => {
        state.LoadingRead = false;
        state.Error =
          action.error.message || "update status notifications failed";
      });
  },
});

export const {
  updateNotification,
  updateNumberOfNotificationsAll,
  updateNumberOfNotificationsSaved,
  updateNumberOfNotificationsTrash,
  updateNotificationList,
  updateStatusReadNotifications,
  updateNumberOfNotificationsUnRead
} = NoticationSlice.actions;

export default NoticationSlice.reducer;
