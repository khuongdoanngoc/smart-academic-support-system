/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendMessageService } from "../../services/ChatBotAPI/ChatBotAPI";
import Avatar from "../../assets/images/avatar.png";


type MessagesUser = {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    sender: string;
  };

type ChatbotResponse= {
    parts: {
        file_source: string[];
        text: string;
    }[];
    role: string;
}

interface InitialState{
    loading: boolean;
    messages: MessagesUser[];
    error: string | any;
}


export const sendMessageAction= createAsyncThunk<ChatbotResponse,MessagesUser>(
    "sendMessageAction",
    async (data: MessagesUser)=>{
        try {
            const res = await sendMessageService(data.message);
            return res as ChatbotResponse;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
)

const initialState: InitialState = {
    loading: false,
    messages: [],
    error: null,
}

const ChatBotSlice= createSlice({
    name: 'chatBot',
    initialState,
    reducers: {
        setMessagesUser: (state,action)=>{
            state.messages= [...state.messages, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(sendMessageAction.pending, (state) => {
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
                state.messages= [...state.messages, data];
            })
           .addCase(sendMessageAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});
export const {
    setMessagesUser
}= ChatBotSlice.actions;
export default ChatBotSlice.reducer;