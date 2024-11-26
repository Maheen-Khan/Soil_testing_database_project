import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


//Auth folder
import Login from './auth/Login';
import Register from './auth/Register';

//Accounts folder

//Components folder
import NavBar from './components/NavBar';

//Admin folder
import RequestList from './admin/RequestList';
import UpdateRequest from './admin/UpdateRequest';

//User folder

import Home from './Home';
import MySamples from './user/MySamples';
import Account from './user/Account';
import RequestSample from './user/RequestSample.jsx';

function App() {
  return (
    <Router>

      
        <NavBar />
      
      <Routes>


          <Route path='/' element={<Home />} />



          <Route path='/request-sample' element={<RequestSample />} />
          <Route path='/my-samples' element={<MySamples />} />
          <Route path='/Account' element={<Account />} />


          <Route path='/update-request' element={<UpdateRequest />} />
          <Route path="/request-list"   element={<RequestList />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
      </Routes>

    </Router>
   
  );
}
export default App
