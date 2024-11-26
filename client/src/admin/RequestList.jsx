import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./RequestList.css";
import UserApi from "../services/UserApi";

function Admin() {
    const [samples, setSamples] = useState([]);  

    useEffect(() => {
        const fetchSamples = async () => {
            try{
                const response = await UserApi.getAllUsers();
                setSamples(response.data);  
                console.log((await response).data)
            }catch(err){
                console.error(err)
            }

        };

        fetchSamples();
    }, []);


    return (
        <div>
            {
            samples && samples.map(res => {
                return <div>
                    <Link to= "/update-request" 
                            state={{"_id" : res._id }}
                            className="admin-div"
                            >
                        <h3>{JSON.stringify(res._id).slice(1,-1)}</h3>
                    </Link>
                    <div>
                        {JSON.stringify(res.status)}
                    </div>
                </div>
            })

            }
        </div>
    );
}


export default Admin;
