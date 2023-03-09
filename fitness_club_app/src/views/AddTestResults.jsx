import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import supabase from "../services/supabase";

function AddTestResults() {
    const [clubNumber, setClubNumber] = useState("");
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchUsers() {
        const { data, error } = await supabase
            .from('Clients')
            .select("id, club_number, name, surname, date_bd, height")
            .eq('club_number', clubNumber);

        console.log(data)
        console.log(error)

        if (error) {
            console.error(error);
            setErrorMessage("Error occurred while fetching data");
        } else {
            setUsers(data);
        }
    }

    function handleClubNumberChange(event) {
        setClubNumber(event.target.value);
    }

    function handleFetchClick() {
        if (clubNumber.length === 4) {
            fetchUsers();
        } else {
            setErrorMessage("Club number must be exactly 4 digits");
        }
    }

    return (
        <div>
            <h2>Member {clubNumber} info</h2>
            <div>
                <span>Enter club number:</span>
                <InputText
                    value={clubNumber}
                    onChange={handleClubNumberChange}
                    maxLength={4}
                    style={{ marginLeft: "8px" }}
                />
                <Button label="Select club member" onClick={handleFetchClick} />
            </div>
            {errorMessage && (
                <div style={{ color: "red", marginTop: "8px" }}>{errorMessage}</div>
            )}
            <div>
                {users.map((user) => (
                        <div className="member-info" key={user.id}>
                            <div>First name: <span className="test_value">{user.name}</span></div>
                            <div>Last name: <span className="test_value">{user.surname}</span></div>
                            <div>Date of birth: <span className="test_value">{user.date_bd}</span></div>
                            <div>Height: <span className="test_value">{user.height}</span></div>
                        </div>
                ))}
            </div>
            <span className="text-center"><a href="/trainer">Return to main dashboard</a></span>
        </div>
    );
}

export default AddTestResults;
