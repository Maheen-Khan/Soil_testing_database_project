import { useState } from "react";
import UseApi from "../services/UseApi";
import "./CreateTest.css"
const CreateTest = () => {
    const [testData, setTestData] = useState({
        testName: "",
        cost: "",
        description: "",
        unit: [], // Start with an empty unit array
    });

    const handleInputChange = (field, value) => {
        setTestData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUnitChange = (index, newUnit) => {
        const updatedUnits = [...testData.unit];
        updatedUnits[index] = newUnit;
        setTestData((prev) => ({
            ...prev,
            unit: updatedUnits,
        }));
    };

    const addUnit = () => {
        setTestData((prev) => ({
            ...prev,
            unit: [...prev.unit, ""], // Add an empty string as a placeholder for the new unit
        }));
    };

    const removeUnit = (index) => {
        const updatedUnits = testData.unit.filter((_, i) => i !== index);
        setTestData((prev) => ({
            ...prev,
            unit: updatedUnits,
        }));
    };

    const createTest = async () => {
        try {
            // Send the test data to the backend for creation
            await UseApi.createTest(testData); // Assume `createTest` method is defined in `UseApi`
            console.log("Test created successfully!");
            setTestData({
                testName: "",
                cost: "",
                description: "",
                unit: [],
            }); // Reset form after successful creation
            alert("Test created!")
        } catch (err) {
            console.error("Error creating test:", err);
            alert("Failure to create Test")
        }
    };

    return (
        <div className="create-test-container">
            <h2>Create Test</h2>
            <div className="create-test-input-group">
                <label className="create-test-label">
                    Test Name:
                    <input
                        className="create-test-input"
                        type="text"
                        value={testData.testName}
                        onChange={(e) => handleInputChange("testName", e.target.value)}
                    />
                </label>
                <label className="create-test-label">
                    Cost:
                    <input
                        className="create-test-input"
                        type="number"
                        value={testData.cost}
                        onChange={(e) => handleInputChange("cost", e.target.value)}
                    />
                </label>
                <label className="create-test-label">
                    Description:
                    <input
                        className="create-test-input"
                        type="text"
                        value={testData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                </label>
            </div>

            <div className="create-test-units-container">
                <label>Units:</label>
                {testData.unit.length > 0 ? (
                    testData.unit.map((unit, index) => (
                        <div className="create-test-unit-item" key={index}>
                            <input
                                className="create-test-input"
                                type="text"
                                value={unit}
                                onChange={(e) => handleUnitChange(index, e.target.value)}
                            />
                            <button
                                className="create-test-remove-button"
                                onClick={() => removeUnit(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No units added</p>
                )}
                <button
                    className="create-test-button"
                    onClick={addUnit}
                >
                    Add Unit
                </button>
            </div>

            <div className="create-test-buttons-container">
                <button
                    className="create-test-button"
                    onClick={createTest}
                >
                    Create Test
                </button>
                <button
                    className="create-test-button"
                    onClick={addUnit}
                >
                    Add Unit
                </button>
            </div>
        </div>
    );
};

export default CreateTest;
