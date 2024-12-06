import { useState, useContext } from 'react'
import { Link, Navigate , useNavigate} from 'react-router-dom'
import "./Login.css"
import LoginApi from '../services/LoginApi.jsx';
import {useAuthContext} from "../AuthContext"
import {getData, setData} from "../SessionHandler"
const Login = (() => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [rememberMe,setRememberMe] = useState(false)
    const {user,dispatch} = useAuthContext()
    const nav = useNavigate();
    
    if(user?.role === 'admin'){
        nav("/request-dashboard")
    }
    if(user === 'user'){
        nav("/")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const userData = {
            name,
            password
        }
        const res = await LoginApi.login(userData)
        if(setData("session","user",JSON.stringify({
            token : res.id,
            name: res.name,
            //email: res.data.email,
            role: res.role
        }))){
            dispatch({type:"LOGIN",data:res})
        }

        // sessionStorage.setItem("name",JSON.stringify(res.data.name)) 
        // sessionStorage.setItem("user",JSON.stringify(res.data.id)) 

        setName("")
        setPassword("")
        console.log("User logged in", getData("user"),res)
                


    }catch(err){
        console.error("Error",err)
    }


    };
    return(
 
        <div className='login-shell'>
            <div className='login-form'>
                <h1 style={{contentAlign:"center"}} className="login-title">Login</h1>
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
                    <div id="rememberMe">
                        <input type="checkbox" value={rememberMe} name="RememberMe" onChange={() => setRememberMe(!rememberMe)}/>
                        <label htmlFor="RememberMe">Remember Me</label>
                    </div>
                    <Link to= "../register" className='login-link' >Don't have an account?</Link>
                    <button type="submit" className="login-submit">Submit</button>
                </form>
            </div>
        </div>

    );
})
export default Login;
