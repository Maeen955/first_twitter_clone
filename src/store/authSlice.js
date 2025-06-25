import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    userData: null,
    refreshPost: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },

        postRefresh: (state) => {
            state.refreshPost = !state.refreshPost;
        }
    }
})

export const {login, logout, postRefresh} = authSlice.actions;

export default authSlice.reducer;