import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import { AuthContextProvider } from './AuthContext';
//Auth folder
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import VerifyUser from './auth/VerifyUser';

//Accounts folder

//Components folder
import NavBar from './components/NavBar';

//Admin folder
import {RequestList, UserList, TestList} from './admin/DataLists';
import UpdateRequest from './admin/UpdateRequest';
import RequestDashboard from './admin/RequestDashboard';
import CreateRequest from './admin/CreateRequest';
import UpdateUser from './admin/UpdateUser';
import UpdateTest from './admin/UpdateTest';
import CreateTest from './admin/CreateTest';

//User folder

import Home from './Home';
import MySamples from './user/MySamples';
import Account from './user/Account';
import RequestSample from './user/RequestSample.jsx';

function App() {
  return (
    <AuthContextProvider>
    <Router>

      
      <NavBar />
      
      <Routes>


          <Route path='/' element={<Home />} />



          <Route path='/request-sample' element={<RequestSample />} />
          <Route path='/my-samples' element={<MySamples />} />
          <Route path='/Account' element={<Account />} />

          <Route path="/request-list"   element={<RequestList />} />
          <Route path="/user-list"   element={<UserList />} />
          <Route path="/test-list"   element={<TestList />} />


          <Route path='/update-request' element={<UpdateRequest />} />
          <Route path="/request-dashboard"   element={<RequestDashboard />} />
          <Route path="/create-request"   element={<CreateRequest />} />
          <Route path="/create-user"   element={<Register />} />
          <Route path="/update-user"   element={<UpdateUser />} />
          <Route path="/update-test"   element={<UpdateTest />} />
          <Route path="/create-test"   element={<CreateTest />} />

          


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-user" element={<VerifyUser />} />
          
      </Routes>

    </Router>
    </AuthContextProvider>
   
  );
}
export default App
