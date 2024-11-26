import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserApi from "../services/UserApi";





function UserSample(){
    
        const {state}  = useLocation();
        const [tests,setTest] = useState([]);
        const [updateData,setUpdateData] = useState({});

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
                await UserApi.updateUser(data,state._id)               // //console.log("Update successful", res.data);

            } catch (err) {
                console.error("Error while updating", err);
            }
        };


        return(<div style={{ color: 'black' }}>
        <h2>User Tests</h2>
        {tests.length > 0 ? 
        (tests.map((test)=>(
            <div key={test.id}>
                <label>
                    {test.name} {test.unit}
                </label>
                <input
                    type="text"
                    defaultValue={test.value || ""}
                    placeholder="Enter test value"
                    onChange={(e) => inputChange(test.id, e.target.value)}
                />
            </div>
        )))
        :(<p>no tests avalible</p>)}
        
        <p>{JSON.stringify(state._id)}</p>
        <button onClick={updateRequests}>Update</button>
        <button>Confirm</button>
        
    
    
    </div>);
}

export default UserSample;