import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJob } from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId
  } = useSelector((store) => store.job)
  const {user} = useSelector((store) => store.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(handleChange({
      name : 'jobLocation', value : user.location
    }))
  },[])
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!position || !company || !jobLocation){
      toast.error("Please fill out all fileds")
      return
    }
    dispatch(createJob({position,company,jobLocation,jobType,status}))
  }

  const handleJobInput = (e) =>{
    let  name = e.target.name;
    let  value = e.target.value;
    dispatch(handleChange({name,value}))
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing? 'Edit job': 'add job'}</h3>
        <div className='form-center'>
            {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
            {/* job status  */}
            <FormRowSelect
              name='status'
              value={status}
              handleChange={handleJobInput}
              list={statusOptions}
            />

            <FormRowSelect
              name='jobType'
              labelText='job type'
              value={jobType}
              handleChange={handleJobInput}
              list={jobTypeOptions}
            />

            <div className='btn-container'>
              <button type='button' className='btn btn-block clear-btn' onClick={()=> dispatch(clearValues())}>
                clear
              </button>
              <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
                {isEditing ? 'Update' : 'submit'}
              </button>
            </div>

        </div>
      </form>      
    </Wrapper>
  )
}

export default AddJob
