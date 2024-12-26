/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendMessageService, TrainChatbotRequest, trainChatbotService } from "../../services/ChatBotAPI/ChatBotAPI";
import Avatar from "../../assets/images/avatar.png";
import { toast } from "react-toastify";


type MessagesUser = {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    sender: string;
};

type DocumentAnalysis={
    fileName: string | undefined;
    subjectName: string | undefined;
    userName: string | undefined;
    filePath: string | undefined;
    docId: number | undefined;
}

type ChatbotResponse= {
    parts: {
        file_source: string[];
        text: string;
    }[];
    role: string;
    filePath: string | undefined;
    fileName: string | undefined;
    subjectName: string | undefined;
    userName: string | undefined;
    docId: number | undefined;
}

interface InitialState{
    loading: boolean;
    messages: MessagesUser[];
    documentAnalysis: DocumentAnalysis[]
    error: string | any;
}


export const sendMessageAction= createAsyncThunk<ChatbotResponse,MessagesUser>(
    "sendMessageAction",
    async (data: MessagesUser)=>{
        try {
            const res = await sendMessageService(data.message);
            return res as unknown as ChatbotResponse;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
);

export const trainChatbotAction= createAsyncThunk<any, TrainChatbotRequest[]>(
    "trainChatbotAction",
    async (data: TrainChatbotRequest[])=>{
        try {
            const res = await trainChatbotService(data);
            return res as any;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
)

const initialState: InitialState = {
    loading: false,
    messages: [],
    error: null,
    documentAnalysis: []
}

const ChatBotSlice= createSlice({
    name: 'chatBot',
    initialState,
    reducers: {
        setMessagesUser: (state,action)=>{
            state.messages= [...state.messages, action.payload];
        },
        resetMessages: (state)=>{
            state.messages= [];
            state.documentAnalysis= [];
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(sendMessageAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainChatbotAction.pending, (state) => {
                state.loading = true;
            })
           .addCase(sendMessageAction.fulfilled, (state, action: PayloadAction<ChatbotResponse>) => {
                state.loading = false;
                const data = {
                    id: Date.now().toString(),
                    name: "DTU AI Chat",
                    avatar: Avatar,
                    message: action.payload.parts[0].text,
                    time: new Date().toLocaleTimeString(),
                    sender: "bot",
                };
                const findDocExist= state.documentAnalysis.find(doc=>doc.docId===action.payload.docId);
                if(!findDocExist){
                    state.documentAnalysis.push({
                        fileName: action.payload.fileName,
                        subjectName: action.payload.subjectName,
                        userName: action.payload.userName,
                        filePath: action.payload.filePath,
                        docId: action.payload.docId,
                    });
                }
                state.messages= [...state.messages, data];
            })
            .addCase(trainChatbotAction.fulfilled, (state) => {
                state.loading = false;
                toast.success("Tài liệu đã được train");
            })
           .addCase(sendMessageAction.rejected, (state, action) => {
                state.loading = false;
                const data = {
                    id: Date.now().toString(),
                    name: "DTU AI Chat",
                    avatar: Avatar,
                    message: "Tôi đang gặp lỗi, vui lòng thử lại sau",
                    time: new Date().toLocaleTimeString(),
                    sender: "bot",
                };
                state.messages= [...state.messages, data];
                state.error = action.error.message;
            })
            .addCase(trainChatbotAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});
export const {
    setMessagesUser,
    resetMessages
}= ChatBotSlice.actions;
export default ChatBotSlice.reducer;