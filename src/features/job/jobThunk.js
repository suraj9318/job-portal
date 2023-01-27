import authHeader from "../../utils/authHeader";
import customFetch, { checkForUnuthorizedResponse } from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";

import { clearValues } from "./jobSlice";




  
export  const createJobThunk  = async (job,thunkAPI)=>{
    try{
        const resp = await customFetch.post('/jobs',job,authHeader(thunkAPI))

        thunkAPI.dispatch(clearValues())
        return resp.data
    }catch(error){
      return checkForUnuthorizedResponse(error, thunkAPI);
    }
  }


export  const deleteJobThunk  =  async (jobId,thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    try{
        const resp = await customFetch.delete(`/jobs/${jobId}`,authHeader(thunkAPI));
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
    }catch(error){
        thunkAPI.dispatch(hideLoading());
        return checkForUnuthorizedResponse(error, thunkAPI);
    }
  }


export  const editJobThunk  = async ({jobId,job},thunkAPI)=>{
    try{
      const resp = await customFetch.patch(`/jobs/${jobId}`, job,authHeader(thunkAPI));
      thunkAPI.dispatch(clearValues())
    }catch(error){
      return checkForUnuthorizedResponse(error, thunkAPI);
    }
  }