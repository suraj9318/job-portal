import customFetch from "../../utils/axios";



export const allJobsThunk =  async(_,thunkAPI)=>{

    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
  
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
    
    try{
        const response = await customFetch.get(url,{
          headers:{
            authorization : `Bearer ${thunkAPI.getState().user.user.token}`
          }
        })
        return response.data;
    }catch(error){
      return thunkAPI.rejectWithValue("There was an error")
    }
  }

  export const showStatsThunk =  async (_,thunkAPI)=>{
    try{
      const resp = await customFetch.get('/jobs/stats',{
        headers:{
          authorization : `Bearer ${thunkAPI.getState().user.user.token}`
        }
      })
      return resp.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
