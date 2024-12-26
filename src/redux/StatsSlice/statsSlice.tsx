import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetStatsForUser } from "../../services/StatsAPI/StatsAPI";

export const getStatsForUser = createAsyncThunk<any>("user/stats", async () => {
    try {
        const response: any = await GetStatsForUser();
        return response;
    } catch (err: any) {
        throw Error(err.message);
    }
});
interface InitialStateStyles {
    loading: boolean;
    error: string | null;
    stats: any;
}
const initialState: InitialStateStyles = {
    loading: false,
    error: null,
    stats: [],
};

const StatsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getStatsForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStatsForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getStatsForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
    },
});

export default StatsSlice.reducer;
