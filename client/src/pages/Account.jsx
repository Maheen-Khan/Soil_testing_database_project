import React from 'react';
import  {useContext}  from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';


const Account = () => {
  const {user} = useAuthContext()

  if(user){
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
