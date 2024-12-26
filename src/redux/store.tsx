import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
import DocumentReducer from "./DocumentSlice/documentSlice";
import TagReducers from "./TagSlice/TagSlice";
import NoticatonReducer from "./Notication/NoticationSlice";
import ChatBotReducer from "./ChatBotSlice/ChatBotSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SearchReducer from "./SearchSlice/searchSlice";
import FolderReducer from "./FolderSlice/folderSlice";

import AdminDashboardReducer from "./AdminDashboardSlice/AdminDashboardSlice";

import authenticationReducer from "./AuthenticationSlice/AuthenticationSlice";
import EditProfileReducer from "./EditProfileSlice/EditProfileSlice";
import searchUserReducer from "./SearchUserSlice/SearchUserSlice";
import profileAuthorReducer from "./ProfileAuthorSlice/ProfileAuthorSlice";
import profilePersonalReducer from "./ProfilePersonalSlice/ProfilePersonalSlice";
import dashBoardReducer from "./DashBoardSlice/DashBoardSlice";
import EditDocumentReducer from "./EditDocumentSlice/EditDocumentSlice";

import statsReducer from "./StatsSlice/statsSlice";

const store = configureStore({
  reducer: {
    uploadFile: UploadFileReducer,
    document: DocumentReducer,
    tag: TagReducers,
    notication: NoticatonReducer,
    chatbot: ChatBotReducer,
    authentication: authenticationReducer,
    searchUser: searchUserReducer,
    editProfile: EditProfileReducer,
    // downloadDocument: profileAuthorReducer,
    profileAuthor: profileAuthorReducer,
    profilePersonal: profilePersonalReducer,
    profileDashBoard: dashBoardReducer,
    editDocument: EditDocumentReducer,
    search: SearchReducer,
    folder: FolderReducer,
    adminDashboard: AdminDashboardReducer,
        stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["EditProfileAction/fulfilled"], // Ignore specific actions
        ignoredPaths: ["editProfile.profileData.profilePicture"],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
