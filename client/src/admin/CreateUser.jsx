import { useState, useContext } from 'react'
import { Link, Navigate , useNavigate} from 'react-router-dom'

import UseApi from '../services/UseApi.jsx';


const CreateUser = (() => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const userData = {
            name,
            password
        }
        const i = await UseApi.login(userData)


        nav("/");


    }catch(err){
        console.error("Error",err)
    }


    };
    return(
 
        <div className='login-shell'>
            <div className='login-form'>
                <h1 style={{contentAlign:"center"}}>Login</h1>
                <form  onSubmit={handleSubmit}>
                    <label className='login-label'>
                        <strong>Username or Email</strong>
                        <input type="text"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                className="login-input"
                        />
                    </label>

                    <label className='login-label'>
                        <strong>Password</strong>
                        <input type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="login-input"
                        />
                    </label>

                    <Link to= "../register" >Dont have an account?</Link>
                    <button type="submit" className="login-submit">Submit</button>
                </form>
            </div>
        </div>

    );
})
export default CreateUser;
