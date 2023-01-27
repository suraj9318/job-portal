import authHeader from "../../utils/authHeader";
import customFetch, { checkForUnuthorizedResponse } from "../../utils/axios";
import { clearAllJobPage } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) =>{
    try{
        const resp = await customFetch.post(url, user)
        return resp.data
    }catch(error){
        return checkForUnuthorizedResponse(error, thunkAPI);
    }
}

export const userLoginThunk = async (url,user,thunkAPI) =>{
    try{
        const resp = await customFetch.post(url, user)
        return resp.data
    }catch(error){
        return checkForUnuthorizedResponse(error, thunkAPI);
    }
}

export const updateUserThunk = async (url,user,thunkAPI) =>{
    try{
        const resp = await customFetch.patch(url, user,authHeader(thunkAPI))
        return resp.data
    }catch(error){
        return checkForUnuthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message,thunkAPI) =>
{
    try{
        thunkAPI.dispatch(logoutUser(message))
        thunkAPI.dispatch(clearAllJobPage())
        thunkAPI.dispatch(clearValues())

        return Promise.resolve();
    }
    catch(error){
        return Promise.reject()
    }
} 