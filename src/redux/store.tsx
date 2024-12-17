import { configureStore } from "@reduxjs/toolkit";
import UploadFileReducer from "./UploadFileSlice/uploadFileSlice";
import DocumentReducer from "./DocumentSlice/documentSlice";
import TagReducers from "./TagSlice/TagSlice";
import NoticatonReducer from "./Notication/NoticationSlice";
import ChatBotReducer from "./ChatBotSlice/ChatBotSlice";
import SearchReducer from "./SearchSlice/searchSlice";
import FolderReducer from "./FolderSlice/folderSlice";
import { useDispatch, useSelector } from "react-redux";
import authenticationReducer from "./AuthenticationSlice/AuthenticationSlice";

const store = configureStore({
    reducer: {
        uploadFile: UploadFileReducer,
        document: DocumentReducer,
        tag: TagReducers,
        notication: NoticatonReducer,
        chatbot: ChatBotReducer,
        authentication: authenticationReducer,
        search: SearchReducer,
        folder: FolderReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: (
    selector: (state: RootState) => unknown
) => unknown = useSelector;
