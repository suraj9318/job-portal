import authHeader from "../../utils/authHeader";
import customFetch, {checkForUnuthorizedResponse} from "../../utils/axios";



export const allJobsThunk =  async(_,thunkAPI)=>{

    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
  
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
    
    try{
        const response = await customFetch.get(url,authHeader(thunkAPI))
        return response.data;
    }catch(error){
      return checkForUnuthorizedResponse(error, thunkAPI);
    }
  }

  export const showStatsThunk =  async (_,thunkAPI)=>{
    try{
      const resp = await customFetch.get('/jobs/stats',authHeader(thunkAPI))
      return resp.data
    }catch(error){
      return checkForUnuthorizedResponse(error, thunkAPI);
    }
  }
