import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserApi from "../services/UserApi";
import "./UpdateRequest.css"
import { useNavigate } from "react-router-dom";




function UpdateUser(){
    
        const {state}  = useLocation();
        const [user,setUser] = useState({name:"1",email:"2",homeAddress:"3"})

        const nav = useNavigate()

        //const res  = location.state?.sampleData || "No information avaliable"

        useEffect(() => {
            if(state?._id) {
            const retriveUser = async () => {
                try{
                    const request = await UserApi.getUser(state._id);
                    const requestData = request.data

                      console.log("Success data retrived")

                      setUser({name:requestData.name,email:requestData.email,homeAddress:requestData.homeAddress})
                      
                }catch(err){
                    console.error("Error obtaining samples", err)
                }
            }
            retriveUser()
        }
        },[state])
        const handleUser = (async (e) =>{
            e.preventDefault()
            e.preventDefault()
            try {
                console.log(user)
                const res = await UserApi.updateUser(user)
                console.log("User updated!!!",res)
                nav("/update-user")
            } catch (error) {
                console.error(error)
            }


        })
        return<div>
            <form onSubmit={handleUser} className="update-form">
                <label className="user-update-label">
                    <strong>User</strong>
                    <input className="user-update-input" placeholder={user.name}
                            value={user.name}
                            onChange={e => setUser(prevUser => ({...prevUser, name: e.target.value}))}>
                    </input>
                </label>

                <label className="user-update-label">
                    <strong>Email</strong>
                    <input className="user-update-input" placeholder={user.email}
                            value={user.email}
                            onChange={e => setUser(prevUser => ({...prevUser, email: e.target.value}))}>
                    </input>
                </label>


                <label className="user-update-label">
                    <strong>Home Address</strong>
                    <input className="user-update-input" placeholder={user.homeAddress}
                            value={user.homeAddress}
                            onChange={e => setUser(prevUser => ({...prevUser, homeAddress: e.target.value}))}>
                    </input>
                </label>

                <div className="update-button-container">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
}
export default UpdateUser;