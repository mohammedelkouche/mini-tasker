import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isloggedIn: false
        // user: null
    },
    // reducers: ers: {
        // login: (state, action) => {
    reducers: {
        login: (state) => {
            state.isloggedIn = true;
        },
        // logout(state, action) {
        logout(state) {
            state.isloggedIn = false;
            // state.user = null;
        },
    },
    
});

// export const { login, logout } = authSlice.actions;
export const authAction = authSlice.actions;
export default authSlice.reducer;