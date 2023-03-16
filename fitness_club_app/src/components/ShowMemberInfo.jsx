import React, {useEffect, useState} from "react";
import supabase from "../services/supabase";

function ShowMemberInfo(props) {
    const { clubNumber } = props;
    const [clients, setClients] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchClients() {
            if (clubNumber.length === 4) {
                const { data, error } = await supabase
                    .from('Clients')
                    .select("id, club_number, name, surname, date_bd, height, membership, membership_end_date, recommendations")
                    .eq('club_number', clubNumber);

                if (error) {
                    console.error(error);
                    setErrorMessage("Error occurred while fetching data");
                } else {
                    setClients(data);
                }
            }
        }

        fetchClients();
    }, [clubNumber]);

    return (
            <div>
                {clients.map((client) => (
                    <div className="member-info" key={client.id}>
                        <div>Membership:&nbsp;
                            <span className="test_value">{client.membership}</span>
                            &nbsp;ends&nbsp;
                            <span className="test_value">
                              {new Date(client.membership_end_date).toLocaleDateString("pl-PL", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit"
                              })}
                            </span>
                        </div>
                        <div>First name: <span className="test_value">{client.name}</span></div>
                        <div>Last name: <span className="test_value">{client.surname}</span></div>
                        <div>Date of birth: <span className="test_value">{new Date(client.date_bd).toLocaleDateString("pl-PL", )}</span>
                        </div>
                        <div>Height: <span className="test_value">{client.height}</span></div>
                        <div>Recommendations: </div>
                        <div className="test_value">{client.recommendations}</div>
                    </div>
                ))}
            </div>
    );
}

export default ShowMemberInfo;