import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
import EditProfileReducer from "./EditProfileSlice/EditProfileSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    uploadFile: UploadFileReducer,
    editProfile: EditProfileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
