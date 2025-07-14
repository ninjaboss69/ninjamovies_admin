import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../services/post.service';

export const getPosts = createAsyncThunk(
    '/get/posts',
    async (__dirname, { rejectWithValue }) => {
        try {
            return await postService.get_all_posts();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
