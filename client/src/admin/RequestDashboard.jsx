import React from 'react';
import './RequestDashboard.css';
import { Link } from 'react-router-dom';

//Create user
//veiw user
//update user
//delete user

//create request
//update request
//delete request
//veiw request

//create Test
//update Test
//delete Test
//veiw test

const RequestDashboard = () => {
  return (
    <div className="admin-home">
      <div className='admin-home-button-shell'>
        <div className="admin-home-button-container">

          {/*   For user links     */}
          <Link to="/create-user" className="admin-home-button">
            Create new User
          </Link>
          <Link to="/create-request" className="admin-home-button">
            Update/Delete a user
          </Link>
        </div>


        <div className="admin-home-button-container">
          <Link to="/create-request" className="admin-home-button">
            Create new Request
          </Link>
          <Link to="/request-list" className="admin-home-button">
            Update/Delete a request
          </Link>

        </div>
      </div>

      
      <footer className="footer">
        Brooklyn College Environmental Science Analytical Center
      </footer>
    </div>
  );
};

export default RequestDashboard;
