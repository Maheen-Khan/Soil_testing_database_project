import { useState } from "react"
import { Link } from "react-router-dom";
import LoginApi from "../services/LoginApi";
import './ForgotPassword.css'
const ForgotPassword = (() =>{
    const [email,setEmail] = useState("");

    const isValidEmail = (() => {
        return true

    })
    const forgotPassword = <div className="forgot-password-div">
        
        <label>
            <h3 className="forgot-password-body">Enter in your email address</h3>

        <input type="text"
        value={email}
        onChange= {(e) => setEmail(e.target.value)}
        className="forgot-password-body"
        />
        </label>

        <Link 
        to="../verify-user"
        state={email}
        onChange= {(e) => {
            if(!isValidEmail(e)){
                e.preventDefault()
                console.log("Incorrect Email")
            }
        }}
        >
        <button>Request Code</button>
        </Link>

    </div>




    return forgotPassword


})
export default ForgotPassword;