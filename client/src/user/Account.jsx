import React from 'react';
import  {useContext}  from 'react';
import Login from '../auth/Login';
import { Navigate } from 'react-router-dom';




const Account = () => {

  const {user,setUser} = useContext(userContext);
  if(user.loggedIn){
    return (
      <div>
        <h2>My Account</h2>
        <p>Manage your account settings and personal details.</p>
        {/* Account settings form can be added here */}
      </div>
    );
  }else{
    return <Navigate to="/login"/>;
    
  }


};

export default Account;
