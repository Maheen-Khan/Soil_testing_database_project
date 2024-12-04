import React from "react";
import { useEffect,useState } from "react";
import AdminApi from "../services/AdminApi";
import "./CreateRequest.css"
const CreateRequest = (() =>{
    const [Tests, setTests] = useState([])
    const [checkedTests, setCheckedTests] = useState({})
    const [email,setEmail] = useState("")

    useEffect(() => {
        const fetchSamples = async () => {
            try{
                const response = await AdminApi.getAllTests();
                //console.log(JSON.stringify(response.data))
                setTests(response.data);  
                console.log((await response).data)


            }catch(err){
                console.error(err)
            }

        };

        fetchSamples();
    }, []);

    const handleCheckboxChange = (id) => {
        setCheckedTests((checkedTest) => ({
            ...checkedTest,
            [id]: {
                checked: !checkedTest[id]?.checked,  //clears previous input value
            },
        }));
    }

    const handleInputChange = (id,value) => {
        console.log(id)
        setCheckedTests((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                input: value,  
            },
        }));
    }
    const handleEmailChange = (value) =>{
        setEmail(value)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()

        console.log(checkedTests)
        const requestData = {
            email,
            tests: Object.keys(checkedTests)
                .filter((id) => checkedTests[id]?.checked) 
                .map((id) => (
                    {
                    testId: id,
                    value: checkedTests[id]?.input || "",  
                })),
        };
        
        console.log(requestData)
        //const res = await AdminApi.createRequest(requestData)
        //console.log(res)

    }




return <div className="create-request-shell">

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={"Enter Email"}
                onChange={(e) => handleEmailChange(e.target.value)}
            />
            {
                Tests && Tests.map(res =>{
                    return <div key={res._id} style={{marginBottom:"20px"}}>
                        <label>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(res._id)}
                            checked={checkedTests[res._id] && checkedTests[res._id].checked}
                        />
                        {res.unit} {res.testName}

                        </label>

                        {checkedTests[res._id] && checkedTests[res._id].checked ? (
                            <input 
                                type="text" 
                                placeholder={`Input for ${res.testName}`} 
                                style={{ marginLeft: "10px" }}
                                onChange={(e) => handleInputChange(res._id,e.target.value)}
                            />
                                ) :
                                <div></div>}
                            </div>
                })
            }
            <button type="submit">Confirm</button>
        </form>
    </div>
})

export default CreateRequest;