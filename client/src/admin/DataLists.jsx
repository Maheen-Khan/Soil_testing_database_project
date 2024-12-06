import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./DataLists.css";
import UserApi from "../services/UserApi";

export function UserList() {
    const [users, setUsers] = useState([]);  

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await UserApi.getAllUsers();
                setUsers(response.data);  
            }catch(err){
                console.error(err)
            }

        };

        fetchUsers();
    }, []);
    return (
       makeList(users,"name","role","/update-user")
     );
}

export function RequestList() {
    const [samples, setSamples] = useState([]);  
    useEffect(() => {
        const fetchSamples = async () => {
            try{
                const response = await UserApi.getAllRequests();
                console.log(response.data)
                setSamples(response.data);  
            }catch(err){
                console.error(err)
            }
            
        };

        fetchSamples();
    }, []);
    return(
        makeList(samples,"_id","status", "/update-request")
    )
}

export function TestList(){
    const [tests,setTests] = useState([])

    useEffect(() =>{
        const fetchTests = async () =>{
            try{
                const response = await UserApi.getAllTests()
                setTests(response.data)

            }catch(err){
                console.error(err)
            }
        }
        fetchTests()
    },[])
    return(makeList(tests,"testName","_id","/update-test"))
}
    // users (list)  //Title (name/id) //Condition(role/status) // Link

const makeList = ((arr,title,condition,link) =>{
    return (
    <div>
        {
        arr && arr.map(res => {
            return <div className="data-list-div">
                <Link to= {link} 
                        state={{"_id" : res._id }}
                        className="data-list-link"
                        >
                    <h3>{JSON.stringify(res[title]).slice(1,-1)}     </h3>
                </Link>
                <div>
                    {JSON.stringify(res[condition]).slice(1,-1)}
                </div>
            </div>
        })

        }
    </div>
    )
})

export default UserList;
