import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', //this by default - so we just putted it here
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Todos'],
    /* this was not able rerender or change current state
    so for that we use tagTypes and invalidates it every time 
    when query is called */

    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformErrorResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodos: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos'] //unsing invalidesTags to invalidate the state or chache
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;