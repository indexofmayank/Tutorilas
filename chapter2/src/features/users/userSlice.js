import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {id: '0', name: "Mayank Tiwari"},
    {id: '1', name: "Tiwari Bhaiya"},
    {id: '2', name: "Bhaiya Mein"}
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;