import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return userAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                {type: 'User', id: "LIST"},
                ...result.ids.map(id => ({type: 'User', id}))
            ]
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice

export const selectUserResult = usersApiSlice.endpoints.getUsers.select()

const selectUserData = createSelector(
    selectUserResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)