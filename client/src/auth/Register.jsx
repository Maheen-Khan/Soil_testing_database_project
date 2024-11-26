import axios from "axios";
import { useState } from "react";
import "./Register.css"
import {Link} from 'react-router-dom';
import LoginApi from "../services/LoginApi";
function Register(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [homeAddress,setHomeaddress] = useState('');



    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(password === confirmPassword){
                const userData = {
                    name,
                    email,
                    password,
                    homeAddress
                }
                await LoginApi.register()
            }else{
                console.log("incorrect password")
            }
        }catch(err){
            console.error(err);
        }


        //After confirmation info gets sent to the backend
    }
    return(


        <div className="reg-shell">
            <div className="reg-form">
            <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label className="reg-label">
                        <strong>Name</strong>
                        <input className="reg-input" type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}                       
                        />
                    </label>

                    <label className="reg-label">
                        <strong>Email</strong>
                        <input className="reg-input" type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}                       
                        />
                    </label>


                    <label className="reg-label">
                        <strong>Password</strong>
                        <input className="reg-input" type="text"
                        value={password}
                        onChange={(i)=> setPassword(i.target.value)}                     
                        />
                    </label>

                    <label className="reg-label">
                        <strong>Confirm Password</strong>
                        <input className="reg-input" 
                        type="text"
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                       />
                    </label>

                    <label className="reg-label">
                        <strong>Home address</strong>
                        <input className="reg-input" type="text"
                        value={homeAddress}
                        onChange={(e)=> setHomeaddress(e.target.value)}/>
                    </label>
                    <Link to= "../login" >Already Have an account?</Link>


                    <button type="submit" className="reg-button">Submit</button>
                </form>
            </div>

        </div>
    )
}
export default Register;
