import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateTag, DeleteTag, UpdateTag } from "../../services/TagAPI/TagAPI";

export interface ITag {
    tagId: number;
    tagName: string;
}

interface InitialStateStyles {
    Loading: boolean;
    Error: string | null;
    Tag: ITag;
}
const initialState: InitialStateStyles = {
    Loading: false,
    Error: "",
    Tag: {
        tagId: 0,
        tagName: "",
    },
};

export const createTag = createAsyncThunk(
    "Tag/createTag",
    async (tagName: string) => {
        try {
            const response = await CreateTag(tagName);
            return response.data;
        } catch (error: any) {
            throw Error(error.message);
        }
    }
);

export const updateTag = createAsyncThunk(
    "Tag/updateTag",
    async (tagData: ITag) => {
        try {
            const response = await UpdateTag(tagData);
            return response.data;
        } catch (error: any) {
            throw Error(error.message);
        }
    }
);

export const deleteTag = createAsyncThunk(
    "Tag/deleteTag",
    async (tagId: number) => {
        try {
            const response = await DeleteTag(tagId);
            return response.data;
        } catch (error: any) {
            throw Error(error.message);
        }
    }
);

const TagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createTag.pending, (state) => {
                state.Loading = true;
            })
            .addCase(createTag.fulfilled, (state, action) => {
                state.Loading = false;
                state.Tag = action.payload;
            })
            .addCase(createTag.rejected, (state, action) => {
                state.Loading = false;
                state.Error =
                    action.error.message ||
                    "error when I call API to create new tag";
            });
    },
});

export default TagSlice.reducer;
