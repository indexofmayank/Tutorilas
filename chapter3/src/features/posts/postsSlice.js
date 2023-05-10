import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | loading' | succeeded | 'failed'
    error: null



    // {id: '1',
    //  title: 'Learning Redux Toolkit',
    //  content: 'wow what a content',
    //  date: sub(new Date(), {minutes: 10}).toISOString(),
    //  reactions: {
    //     thumbsUp: 0,
    //     wow: 0,
    //     heart: 0,
    //     rocket: 0,
    //     coffee: 0
    // }
    // },
    // {id: '2',
    //  title: 'Slicess...more title',
    //  content: "one more content fake",
    //  date: sub(new Date(), {minutes: 10}).toISOString(),
    //  reactions: {
    //     thumbsUp: 0,
    //     wow: 0,
    //     heart: 0,
    //     rocket: 0,
    //     coffee: 0
    // }
    // }
}

export const fetchPosts = createAsyncThunk('posts/fechPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk(`posts/addNewPost`, async (initailPost) => {
    const response = await axios.post(POSTS_URL, initailPost);
    return response.data;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), {minutes: min++}).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            const sortedPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
            // End fix for fake API post IDs 

            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }
            console.log(action.payload)
            state.posts.push(action.payload)
        })
    }
});

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

