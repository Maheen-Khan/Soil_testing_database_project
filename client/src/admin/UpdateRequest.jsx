import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserApi from "../services/UserApi";
import "./UpdateRequest.css"
import { useNavigate } from "react-router-dom";




function UserSample(){
    
        const {state}  = useLocation();
        const [tests,setTest] = useState([]);
        const [updateData,setUpdateData] = useState({});
        const nav = useNavigate()

        //const res  = location.state?.sampleData || "No information avaliable"

        useEffect(() => {

            const getRequests = async () => {
                try{
                    const requestData = await UserApi.getRequest(state._id);

                      console.log("Success data retrived")
                      console.log(requestData)
                      setTest(requestData);
                }catch(err){
                    console.error("Error obtaining samples", err)
                }
            }
            getRequests()
        },[state])
        //handle test value modification
        const inputChange = async (testId,value) =>{
            setUpdateData((prev) => ({
                ...prev,
                [testId] : value
            }))
        }
        
        const updateRequests = async () => {
            try {
                const updatedTests = tests.map((test) => ({
                    testId: test.id,  // Send the test ID (test._id)
                    value: updateData[test.id] !== undefined ? updateData[test.id] : test.value, 
                }
                ));
                const data = {tests : updatedTests}
                await UserApi.updateRequest(data,state._id)               // //console.log("Update successful", res.data);

            } catch (err) {
                console.error("Error while updating", err);
            }
        };

        const removeRequest = (async () =>{
            try{
                const decision = confirm("Delete Request?");
                if(decision){
                    await UserApi.deleteUser(state._id)
                    nav("/request-list")
                }
            }catch{
                console.error("Error while deleting")
            }
        })


        return(<div>
            <button className="trash" onClick={() =>removeRequest()}>Trash!!!</button>

        
        <div className="request-update-shell">

        
        <h2>User Tests</h2>
        <p>{JSON.stringify(state._id)}</p>
        {tests.length > 0 ? 
        (tests.map((test)=>(
            <div key={test.id}>
                <label className="request-update-label">
                    <div>
                    {test.name} {test.unit}
                    </div>
                <input
                    type="text"
                    defaultValue={test.value || ""}
                    placeholder="Enter test value"
                    onChange={(e) => inputChange(test.id, e.target.value)}
                />
                </label>
            </div>
        )))
        :(<p>no tests avalible</p>)}
        
        
        <div className="request-update-button">
        <button onClick={updateRequests} >Update</button>
        <button >Confirm</button>
        </div>
        
    
    
    </div>
    </div>);
}

export default UserSample;