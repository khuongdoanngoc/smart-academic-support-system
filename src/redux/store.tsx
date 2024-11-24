import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
import EditProfileReducer from "./EditProfileSlice/EditProfileSlice";

const store = configureStore({
  reducer: {
    uploadFile: UploadFileReducer,
    editProfile: EditProfileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
