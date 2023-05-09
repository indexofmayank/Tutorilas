import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";



const initialState = [
    {id: '1',
     title: 'Learning Redux Toolkit',
     content: 'wow what a content',
     date: sub(new Date(), {minutes: 10}).toISOString(),
    },
    {id: '2',
     title: 'Slicess...more title',
     content: "one more content fake",
     date: sub(new Date(), {minutes: 10}).toISOString()
    }
]

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
                    date: new Date().toISOString()
                }
            }
           }
       }
    }
});

export const selectAllPosts = (state) => state.posts;
export const {postAdded} = postsSlice.actions

export default postsSlice.reducer;

