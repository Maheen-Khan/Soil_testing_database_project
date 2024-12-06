import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";
import "./CreateRequest.css";

const CreateRequest = () => {
    const [tests, setTests] = useState([]);
    const [checkedTests, setCheckedTests] = useState({});
    const [email, setEmail] = useState("");
 
    useEffect(() => {
        const getTests = async () => {
            try {
                const response = await UserApi.getAllTests();
                setTests(response.data);
            } catch (err) {
                console.error(err);
                alert("Failure to recive tests from database")
            }
        };

        getTests();
    }, []);

    const handleCheckboxChange = (id) => {
        setCheckedTests((prevState) => ({
            ...prevState,
            [id]: {
                checked: !prevState[id]?.checked,
                inputs: prevState[id]?.inputs || {},
            },
        }));
    };

    const handleInputChange = (testId, unitValue, inputValue) => {
        setCheckedTests((prevState) => ({
            ...prevState,
            [testId]: {
                ...prevState[testId],
                inputs: {
                    ...prevState[testId]?.inputs,
                    [unitValue]: inputValue,
                },
            },
        }));
    };

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            email,
            tests: tests
                .filter((test) => checkedTests[test._id]?.checked)
                .map((test) => ({
                    testId: test._id,
                    values: test.unit.map((unitValue) => {
                        return checkedTests[test._id]?.inputs[unitValue] || "";
                    }),
                })),
        };

        console.log(requestData);

        try {
            const res = await UserApi.createRequest(requestData);
            console.log(res);
            alert("Sucess: Request Created!")
        } catch (err) {
            console.error("Error submitting the request:", err);
            alert("Error: Request not created")
        }
    };

    return (
        <div className="create-request-shell">
            <form className="create-request-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="create-request-email"
                    placeholder="Enter Email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                />
                {tests &&
                    tests.map((test) => (
                        <div key={test._id} className="create-request-test-item">
                            <div className="create-request-checkbox-container">
                                <input
                                    type="checkbox"
                                    className="create-request-checkbox"
                                    onChange={() => handleCheckboxChange(test._id)}
                                    checked={checkedTests[test._id]?.checked || false}
                                />
                                <span>{test.testName}</span>
                            </div>
                            {Array.isArray(test.unit)
                                ? test.unit.map((unitValue, index) => (
                                      <div key={index}>
                                          {checkedTests[test._id]?.checked ? (
                                              <input
                                                  type="text"
                                                  className="create-request-input-field"
                                                  placeholder={`Input for ${test.testName} (${unitValue})`}
                                                  onChange={(e) =>
                                                      handleInputChange(
                                                          test._id,
                                                          unitValue,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          ) : null}
                                      </div>
                                  ))
                                : test.unit && checkedTests[test._id]?.checked ? (
                                      <input
                                          type="text"
                                          className="create-request-input-field"
                                          placeholder={`Input for ${test.testName}`}
                                          onChange={(e) =>
                                              handleInputChange(test._id, test.unit, e.target.value)
                                          }
                                      />
                                  ) : null}
                        </div>
                    ))}
                <button type="submit" className="create-request-submit-button">
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
