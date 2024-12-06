import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UseApi from "../services/UseApi";
import "./UpdateTest.css";

const UpdateTest = () => {
    const { state } = useLocation();
    const [test, setTest] = useState({});
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        const getTests = async () => {
            try {
                const response = await UseApi.getTest(state._id);
                console.log("Success data retrieved:", response.data);

                // Set the response data directly to the state
                setTest(response.data);
                setUpdateData(response.data); // Initialize updateData with the testData
            } catch (err) {
                console.error("Error obtaining tests:", err);
            }
        };
        getTests();
    }, [state]);

    const handleInputChange = (key, value) => {
        setUpdateData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleUnitChange = (index, newUnit) => {
        setUpdateData((prevState) => {
            const updatedUnits = [...(prevState.unit || test.unit)];
            updatedUnits[index] = newUnit;

            return {
                ...prevState,
                unit: updatedUnits,
            };
        });
    };

    const addUnit = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            unit: [...(prevState.unit || test.unit), ""], // Add an empty unit
        }));
    };

    const removeUnit = (index) => {
        setUpdateData((prevState) => {
            const updatedUnits = prevState.unit.filter((_, i) => i !== index);
            return {
                ...prevState,
                unit: updatedUnits,
            };
        });
    };

    const updateTests = async () => {
        try {
            const updatedTest = {
                ...test,
                ...updateData, // Apply updates from `updateData`
            };
            await UseApi.updateTest(state._id, updatedTest);
            console.log("Update successful");
        } catch (err) {
            console.error("Error while updating tests:", err);
        }
    };

    return (
        <div className="update-test-container">
            <h2 className="update-test-title">Update Test</h2>
            {test ? (
                <div className="update-test-form">
                    <label className="update-test-label">
                        Test Name:
                        <input
                            type="text"
                            className="update-test-input"
                            value={updateData.testName || ""}
                            onChange={(e) =>
                                handleInputChange("testName", e.target.value)
                            }
                        />
                    </label>
                    <label className="update-test-label">
                        Cost:
                        <input
                            type="number"
                            className="update-test-input"
                            value={updateData.cost || ""}
                            onChange={(e) =>
                                handleInputChange("cost", e.target.value)
                            }
                        />
                    </label>
                    <label className="update-test-label">
                        Description:
                        <input
                            type="text"
                            className="update-test-input"
                            value={updateData.description || ""}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                        />
                    </label>

                    <div className="update-test-units">
                        <label className="update-test-units-label">Units:</label>
                        {updateData.unit && updateData.unit.length > 0 ? (
                            updateData.unit.map((unit, index) => (
                                <div key={`${test._id}-unit-${index}`} className="update-test-unit">
                                    <input
                                        type="text"
                                        className="update-test-unit-input"
                                        value={unit}
                                        onChange={(e) =>
                                            handleUnitChange(index, e.target.value)
                                        }
                                    />
                                    <button
                                        className="update-test-remove-unit"
                                        onClick={() => removeUnit(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No units available</p>
                        )}
                        <button
                            className="update-test-add-unit"
                            onClick={addUnit}
                        >
                            Add Unit
                        </button>
                    </div>
                </div>
            ) : (
                <p className="update-test-no-data">No test data available</p>
            )}
            <button className="update-test-button" onClick={updateTests}>
                Update Test
            </button>
        </div>
    );
};

export default UpdateTest;
