import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};


export const getAllJobs = createAsyncThunk('allJobs/getJobs', async(_,thunkAPI)=>{
  let url = `/jobs`
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
})

export const showStats = createAsyncThunk('allJobs/showStats', async (_,thunkAPI)=>{
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
})

const allJobsSlice = createSlice({
  name : "allJobs",
  initialState,
  reducers :{
    showLoading : (state)=>{
      state.isLoading = true
    },

    hideLoading : (state)=>{
      state.isLoading = true
    },
    handleChange : (state,{payload:{name,value}})=>{
      // state.page = 1;
      state[name] = value;
    },
    clearFilters : (state)=>{
      return {...state, ...initialFiltersState}
    }
  },
  extraReducers : {
    [getAllJobs.pending] : (state) =>{
      state.isLoading = true;
    },
    [getAllJobs.fulfilled] : (state,{payload}) =>{
      state.isLoading = false;
      state.jobs = payload.jobs
    },
    [getAllJobs.rejected] : (state,{payload}) =>{
      state.isLoading = false;
      toast.error (payload)
    },


    [showStats.pending] : (state) =>{
      state.isLoading = true;
    },
    [showStats.fulfilled] : (state,{payload}) =>{
      state.isLoading = false;
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [showStats.rejected] : (state,{payload}) =>{
      state.isLoading = false;
      toast.error (payload)
    }


  }
})

export const {showLoading, hideLoading, handleChange, clearFilters} = allJobsSlice.actions;
export default allJobsSlice.reducer;