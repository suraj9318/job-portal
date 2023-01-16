import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import {toast} from 'react-toastify';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localstorage';
import { registerUserThunk, updateUserThunk, userLoginThunk } from './userThunk';


const initialState = {
    isLoading : false,
    isSidebarOpen : false,
    user : getUserFromLocalStorage()
}

export const registerUser  = createAsyncThunk('user/register', async (user, thunkAPI)=>{
    return registerUserThunk('/auth/register', user, thunkAPI)
}) 

export const loginUser  = createAsyncThunk('user/login', async (user, thunkAPI)=>{
    return userLoginThunk('/auth/login', user, thunkAPI)
})


export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI)=>{
   return updateUserThunk('/auth/updateUser',user,thunkAPI)

})

const userSlice = createSlice ({
    name : 'user',
    initialState,
    reducers : {
        toggleSidebar: (state) =>{
            console.log(state.isSidebarOpen);
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser :(state) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
        }
    },
    extraReducers :{
        [registerUser.pending] : (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled] : (state, {payload}) => {
            const {user} = payload
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`)
        },
        [registerUser.rejected] : (state,{payload}) => {
            state.isLoading = false
            toast.error(payload)
        },


        [loginUser.pending] : (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled] : (state, {payload}) => {
            const {user} = payload
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`Welcome Back ${user.name}`)
        },
        [loginUser.rejected] : (state,{payload}) => {
            state.isLoading = false
            toast.error(payload)
        },

        [updateUser.pending] : (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled] : (state, {payload}) => {
            const {user} = payload
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`User Updated`)
        },
        [updateUser.rejected] : (state,{payload}) => {
            state.isLoading = false
            toast.error(payload)
        }


    }
})

export const {toggleSidebar, logoutUser} = userSlice.actions
export default userSlice.reducer; 
