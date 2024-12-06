import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseApi from "../services/UseApi";
import "./UpdateRequest.css";

const UserSample = (() => {
    const { state } = useLocation();
    const [tests, setTests] = useState([]);
    const [updateData, setUpdateData] = useState({});
    const [status,setStatus] = useState("Pending")
    const nav = useNavigate();

    useEffect(() => {
        const getRequests = async () => {
            try {
                const requestData = await UseApi.getRequest(state._id);
                console.log("Success data retrieved:", requestData);
                setTests(requestData);
            } catch (err) {
                console.error("Error obtaining samples:", err);
            }
        };
        getRequests();
    }, [state]);

    const inputChange = (testId, index, newValue) => {
        setUpdateData((prev) => {
            const updatedTest = prev[testId] || { values: [...(tests.find((test) => test.id === testId)?.values || [])] };

            // Update the specific value at the given index
            updatedTest.values[index] = newValue;

            return {
                ...prev,
                [testId]: updatedTest,
            };
        });
    };

    const updateRequests = async () => {
        try {
            const updatedTests = tests.map((test) => ({
                testId: test.id,
                values: updateData[test.id]?.values || test.values,
            }));
            const data = { tests: updatedTests, status: status };
            await UseApi.updateRequest(data, state._id);
            console.log("Update successful");
            alert("Sucess: Request Updated")
        } catch (err) {
            console.error("Error while updating:", err);
            alert("Error: Failure to update Request")
        }
    };

    const removeRequest = async () => {
        try {
            const decision = window.confirm("Delete Request?");
            if (decision) {
                await UseApi.deleteUser(state._id);
                nav("/request-list");
            }
        } catch (err) {
            console.error("Error while deleting:", err);
        }
    };

    return (
        <div className="request-update-container">

            <div className="request-update-shell">
            <button className="trash" onClick={removeRequest}>
                Trash!!!
            </button>

                <h2>User Tests</h2>
                <p>{JSON.stringify(state._id)}</p>
                {tests.length > 0 && tests[0]?.values ? (
                    tests.map((test) =>
                        test.unit.map((value, index) => (
                            <div key={`${test.id}-${index}`} className="request-update-row">
                                <label className="request-update-label">
                                    <div>{test.name}</div>
                                    <div>
                                        <input
                                            type="text"
                                            defaultValue={test.values?.[index] || ""}
                                            placeholder="Enter test value"
                                            onChange={(e) =>
                                                inputChange(
                                                    test.id,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {test.unit[index]}
                                    </div>
                                </label>
                            </div>
                        ))
                    )
                ) : (
                    <p>No tests available</p>
                )}

                <div className="request-update-button">
                    <button onClick={updateRequests}>Update</button>
                    <button onClick={() => setStatus("Confirmed")}>Confirm</button>
                </div>
            </div>
        </div>
    );
})

export default UserSample;
