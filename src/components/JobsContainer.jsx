import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';
const JobsContainer = () => {
    const {jobs, isLoading, totalJobs, numOfPages,page, search, searchStatus, searchType,sort} = useSelector((store)=>store.allJobs)
    const dispatch = useDispatch();

    useEffect(()=>{
            dispatch(getAllJobs())
    },[page,search, searchStatus, searchType,sort])
    if(isLoading){
        return (
        <Loading center/>
        );
    }
    if(jobs.length === 0){
        return (
            <Wrapper>
                <h2>No Jobs to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
        <h5>{totalJobs} Job{jobs.length>1 && 's'} Found</h5>
        <div className="jobs">
            {jobs.map((job)=>{
                return <Job key={job._id} {...job}/>
            })}
        </div>
        {numOfPages> 1 && <PageBtnContainer/>  }
        </Wrapper>
    )
}

export default JobsContainer
