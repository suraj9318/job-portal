import { useEffect } from 'react';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
  const dispatch = useDispatch();
  const {isLoading, monthlyApplications} = useSelector((store)=>store.allJobs)
  useEffect(()=>{
    dispatch(showStats())
    // eslint-disable-next-line
  },[]) 
  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length > 0 && <ChartsContainer/>}
    
    </>
  )
}

export default Stats
