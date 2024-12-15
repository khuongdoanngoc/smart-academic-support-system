import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
// import DocumentReducer from "./DocumentSlice/documentSlice";
import TagReducers from "./TagSlice/TagSlice";
import NoticatonReducer from "./Notication/NoticationSlice";
import ChatBotReducer from "./ChatBotSlice/ChatBotSlice";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import SearchReducer from "./SearchSlice/searchSlice";
import authenticationReducer from "./AuthenticationSlice/AuthenticationSlice";
import EditProfileReducer from "./EditProfileSlice/EditProfileSlice";
import searchUserReducer from "./SearchUserSlice/SearchUserSlice";
import profileAuthorReducer from "./ProfileAuthorSlice/ProfileAuthorSlice";

const store = configureStore({
  reducer: {
    uploadFile: UploadFileReducer,
    // document: DocumentReducer,
    tag: TagReducers,
    notication: NoticatonReducer,
    chatbot: ChatBotReducer,
    authentication: authenticationReducer,
    searchUser:searchUserReducer,
    editProfile: EditProfileReducer,
    // downloadDocument: profileAuthorReducer,
    profileAuthor: profileAuthorReducer,
    search: SearchReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
