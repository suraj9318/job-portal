import { useEffect, useState } from 'react';
import { Logo,FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState={
    name : '',
    email : '',
    password :'',
    isMember : true 
}

function Register() {
    const {user, isLoading} = useSelector(store => store.user)
    const dispath = useDispatch();
    const navigate = useNavigate();

   
    const [values, setValues] = useState(initialState)
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name]:value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        const {name,email,password, isMember} = values;

        if(!email || !password || (!isMember && !name)){
            toast.error('Please Fill Out All Fields');
            return;
        }
        if(isMember){
            dispath(loginUser({email, password }))
            return;
        }
        dispath(registerUser({name, email, password}))
    }
    const toggleMember = () =>{
        setValues({...values, isMember :!values.isMember  })
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(user){
                navigate('/')
            }
        },2000)
    },[user, navigate])

  return (
    <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo/>
            <h3>{values.isMember ? 'Login' : 'Resgiter'}</h3>
            {/* name field */}
            {
            !values.isMember &&  <FormRow type="text" name="name" value={values.name} handleChange={handleChange}/>
            
            }
            {/* email field */}
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>
            {/* password field */}
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>

            <button type="submit" className="btn btn-block" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'submit'}
            </button>

            <p> {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                <button type='button' className='member-btn' onClick={toggleMember}>
                    {values.isMember ? 'register' : 'login'}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register
