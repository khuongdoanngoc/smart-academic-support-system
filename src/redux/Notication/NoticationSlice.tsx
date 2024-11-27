import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { NoticationDelect } from "../../services/NoticationAPI/NoticationAPI";
interface DelectId {
  notificationId: number;
}
export const DelectAction = createAsyncThunk(
  "Notication/DelectAction",
  async (notificationId: DelectId) => {
    try {
      const reponse = await NoticationDelect(notificationId);
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
  Error: string;
  id: number;
}
const initialState: initNotication = {
  Loading: false,
  Error: "",
  id: 0,
};

const NoticationSlice = createSlice({
  name: "Notication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DelectAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(DelectAction.fulfilled, (state) => {
        state.Loading = true;
      })
      .addCase(DelectAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.error.message || "Delect Failed";
      });
  },
});

export default NoticationSlice.reducer;
