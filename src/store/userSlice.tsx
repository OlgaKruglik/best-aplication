import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface UserState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state: UserState) => {
            state.status = 'loading';
        })
            .addCase(fetchPosts.fulfilled, (state: UserState, action: PayloadAction<Post[]>) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        })
            .addCase(fetchPosts.rejected, (state: UserState, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
    }
    });

export default userSlice.reducer;
