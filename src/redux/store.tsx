import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
import DocumentReducer from "./DocumentSlice/documentSlice";
import TagReducers from "./TagSlice/TagSlice";
import { useDispatch } from "react-redux";
import authenticationReducer from "./AuthenticationSlice/AuthenticationSlice";

const store = configureStore({
  reducer: {
    uploadFile: UploadFileReducer,
    document: DocumentReducer,
    tag: TagReducers,
    authentication: authenticationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
