import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  SearchInterface,
  SearchUserAPI,
} from "../../services/SearchUserAPI/SearchUserApi";

interface SearchInitState {
  loading: boolean;
  error: string | null;
  listSearch: SearchInterface[];
}

const initialState: SearchInitState = {
  loading: false,
  error: null,
  listSearch: [],
};

export const SearchUserAction = createAsyncThunk<SearchInterface[], string>(
  "SearchAction",
  async (name: string) => {
    try {
      const ressponse = await SearchUserAPI(name);
      return ressponse as unknown as SearchInterface[];
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        SearchUserAction.fulfilled,
        (state, action: PayloadAction<SearchInterface[]>) => {
          state.loading = false;
          state.listSearch = action.payload;
          state.error = null;
        }
      )
      .addCase(SearchUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { clearSearchUser } = SearchUserSlice.actions;

export default SearchUserSlice.reducer;
