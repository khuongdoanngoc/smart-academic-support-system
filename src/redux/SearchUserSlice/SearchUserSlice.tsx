/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  SearchInterface,
  SearchUserAPI,
  SearchUserInformationAPI,
  SearchViewUserInterface,
} from "../../services/SearchUserAPI/SearchUserApi";
import { toast } from "react-toastify";

interface SearchInitState {
  loading: boolean;
  activeLoadMore: boolean;
  error: string | null;
  listSearch: SearchInterface[];
  listViewUser: SearchViewUserInterface[];
}

const initialState: SearchInitState = {
  loading: false,
  error: null,
  listSearch: [],
  listViewUser: [],
  activeLoadMore: false
};

export const SearchUserAction = createAsyncThunk<SearchInterface[], {name:string,pageSize:number,pageNum:number}>(
  "SearchUserAction",
  async ({name,pageSize,pageNum}) => {
    try {
      const ressponse = await SearchUserAPI(name,pageSize,pageNum);
      return ressponse as unknown as SearchInterface[];
      
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new AxiosError(error.message);
    }
  }
);
export const SearchUserInformationAction = createAsyncThunk<SearchViewUserInterface[], string>(
  "SearchUserInformationAction",
  async (email: string) => {
    try {
      const ressponse = await SearchUserInformationAPI(email);
      return ressponse as unknown as SearchViewUserInterface[];
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new AxiosError(error.message);
    }
  }
);
const SearchUserSlice = createSlice({
  name: "SearchUser",
  initialState,
  reducers: {
    clearSearchUser: (state) => {
      state.listSearch = [];
    },
    setActiveLoadMore: (state, action: PayloadAction<boolean>) => {
      state.activeLoadMore = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchUserAction.pending, (state) => {
        if(!state.activeLoadMore) state.loading = true;
        state.error = null;
      })
      .addCase(SearchUserInformationAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        SearchUserAction.fulfilled,
        (state, action: PayloadAction<SearchInterface[]>) => {
          state.loading = false;
          state.activeLoadMore = false;
          if(state.listSearch.length>0 && action.payload.length === 0){
            toast.info("Không tìm thấy thêm người dùng nào");
          }else{
            state.listSearch= [...state.listSearch,...action.payload];
          }
          state.error = null;
        }
      )
      .addCase(
        SearchUserInformationAction.fulfilled,
        (state, action: PayloadAction<SearchViewUserInterface[]>) => {
          state.loading = false;
          state.listViewUser = action.payload;
          state.error = null;
        }
      )
      .addCase(SearchUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(SearchUserInformationAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { clearSearchUser,setActiveLoadMore } = SearchUserSlice.actions;

export default SearchUserSlice.reducer;
