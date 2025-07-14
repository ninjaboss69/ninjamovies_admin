import { getPosts } from '../action/post.action';

const { createSlice } = require('@reduxjs/toolkit');

const DEFAULT_INITIAL_STATE = {
    isLoading: false,
    isSuccess: false,
    posts: [],
};

const postSlice = createSlice({
    name: 'post-slice',
    initialState: DEFAULT_INITIAL_STATE,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.posts = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = action.payload;
        });
        builder.addCase(getPosts.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });
    },
});

// export const { reset } = mapSlice.actions;

export default postSlice;
