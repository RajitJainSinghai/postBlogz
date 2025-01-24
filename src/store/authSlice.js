import { createSlice } from "@reduxjs/toolkit";
// Define the initial state
const initialState = {
    status : false,
    userData : null
}
// added name and reducers to the createSlice function
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;  
        },
        logout: (state) => { 
            state.status = false;
            state.userData = null;
        }
    }

});
//need to export the action creators
export const {login, logout} = authSlice.actions;


export default authSlice.reducer;