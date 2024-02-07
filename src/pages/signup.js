import {useState} from 'react';
import { signUp } from '../api';
import {useNavigate} from 'react-router-dom';
import Welcome from './welcome';

const Signup = () =>{
    const [user, setUser ] = useState({ email : "" , password : "" ,});
    const [error , setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(user, '[user]-[handleSubmit]');

        try {
            const resp = await signUp(user);
            console.log(resp.data, '[resp.data]');
            localStorage.setItem('accessToken',resp.data.accessToken);
            navigate('/');
        } catch (err) {
            console.error(err, '[error in Signup]');
            const {response} = err;
            setError(response.data.message);
        }

    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name] : value});
        // console.log(user, '[user]-[handleChange]');
    }

    const handleLogin = (e) =>{
        navigate('/login');
    }

    return (
        <div className='wrapper'>
            <div>
                <Welcome/>
            </div>


            <div className='auth-container'>
                <div className='heading'>
                    Signup
                </div>

                {error && <div className='error'>
                    <p>{error}</p></div>
                }

                <form className='form' id='form' onSubmit={handleSubmit}>

                    <div className=''>
                        <label htmlFor="name" className='label'>Name <span style = {{color: "red"}}>*</span> </label>
                        <input type="text" className='input' id="name" name="name" placeholder = "Your Name" required onChange={handleChange}/>
                    </div>

                    <div className=''>
                        <label htmlFor="email" className='label'>Email <span style = {{color: "red"}}>*</span> </label>
                        <input type="email" className='input' id ="email" name = "email" placeholder = "Your Email ID" required onChange={handleChange}/>

                    </div>

                    <div className=''>
                        <label htmlFor="password" className='label'>Password <span style = {{color: "red"}}>*</span> </label>
                        <input type="password" className='input' id="password" name="password" placeholder = "Password" required onChange={handleChange}/>
                    </div>

                    <div className=''>
                        <button type ="submit" form='form' className='button'>Continue</button>
                    </div>
                    
                </form>

                <div className='footer'>
                    <p>Already have an account ?</p>
                    <button type='button' className='button' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;