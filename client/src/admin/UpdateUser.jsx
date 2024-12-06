import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseApi from "../services/UseApi";
import "./UpdateUser.css";

const UpdateUser = (() => {
    const { state } = useLocation();
    const [user, setUser] = useState({ name: "", email: "", homeAddress: "" });
    const nav = useNavigate();

    useEffect(() => {
        if (state?._id) {
            const retrieveUser = async () => {
                try {
                    const request = await UseApi.getUser(state._id);
                    const requestData = request.data;
                    console.log("Success data retrieved");
                    setUser({
                        name: requestData.name,
                        email: requestData.email,
                        homeAddress: requestData.homeAddress,
                    });
                } catch (err) {
                    console.error("Error obtaining user data", err);
                }
            };
            retrieveUser();
        }
    }, [state]);

    const handleUser = async (e) => {
        e.preventDefault();
        try {
            console.log(user);
            const res = await UseApi.updateUser(user);
            console.log("User updated!!!", res);
            alert("User updated!")
            nav("/update-user");
        } catch (error) {
            console.error(error);
            alert("Failure to update user")
        }
    };

    return (
        <div className="update-user-container">
            <form onSubmit={handleUser} className="update-user-form">
                <label className="update-user-label">
                    <strong>User Name</strong>
                    <input
                        className="update-user-input"
                        placeholder={user.name}
                        value={user.name}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
                        }
                    />
                </label>

                <label className="update-user-label">
                    <strong>Email</strong>
                    <input
                        className="update-user-input"
                        placeholder={user.email}
                        value={user.email}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
                        }
                    />
                </label>

                <label className="update-user-label">
                    <strong>Home Address</strong>
                    <input
                        className="update-user-input"
                        placeholder={user.homeAddress}
                        value={user.homeAddress}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, homeAddress: e.target.value }))
                        }
                    />
                </label>

                <div className="update-button-container">
                    <button type="submit" className="update-user-button">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
})

export default UpdateUser;
