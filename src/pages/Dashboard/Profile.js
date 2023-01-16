import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const {isLoading, user} = useSelector((store)=>store.user)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name : user?.name || '',
    email : user?.email || '',
    lastName : user?.lastName || '',
    location : user?.location || '',
  }) 

  const handleSubmit = (e) =>{
    e.preventDefault();
        const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
    }

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData,[name]:value})
    }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow type="text" name="name" value={userData.name} handleChange={handleChange}/>
          <FormRow type="text" labelText="last Name" name="lastName" value={userData.lastName} handleChange={handleChange}/>
          <FormRow type="email" name="email" value={userData.email} handleChange={handleChange}/>
          <FormRow type="text" name="location" value={userData.location} handleChange={handleChange}/>
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading? 'Please wait...' : 'save changes'}
          </button>
        </div>
      </form>
      
    </Wrapper>
  )
}

export default Profile
