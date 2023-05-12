import {
    createSelector,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import {apiSlice} from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responeData => {
                let min = 1;
                const loadedPosts = responeData.map(post => {
                    if(!post?.date) post.date = sub(new Date(),{minutes: min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: "LIST"},
                ...result.id.map(id => ({type: 'Post', id}))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [
                {type: 'Post', id: 'LIST'}
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Post', id: arg.id}
            ]
        }),
        getPostByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.id.map(id => ({type: 'Post', id}))
            ]
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Post', id: arg.id}
            ]
        }),
        addRection: builder.mutation({
            query: ({postId, reactions}) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                body: {reactions}
            }),
            async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
       

    })
})

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddRectionMutation,
    useGetPostByUserIdQuery
} = extendedApiSlice

// return the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();


// Create memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data //normalied state object with ids & entites
)

//getSelectors creates these selectors and we rename them with allias using destructing
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of the state
} =  postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);
