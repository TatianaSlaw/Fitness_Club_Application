import React, { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import supabase from "../services/supabase";

import { useNavigate } from "react-router-dom";
import ShowMemberInfo from "./Showmemberinfo.jsx";

function AddTestResults() {
    const [clubNumber, setClubNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [results, setResults] = useState([]);
    const [dates, setDates] = useState([]);

    const toast = useRef(null);
    const navigate = useNavigate();

    const showSuccess = (msg) => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: msg,
            life: 3000,
        });
    };
    const showError = (msg) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: msg,
            life: 3000,
        });
    };


    function handleClubNumberChange(event) {
        setClubNumber(event.target.value);
    }

    function handleFetchClick() {
        if (clubNumber.length === 4) {
            fetchResults();
        } else {
            setErrorMessage("Club number must be exactly 4 digits");
        }
    }

    useEffect(() => {
        if (clubNumber) {
            fetchResults();
        }
    }, []);

    function renderResultsTable() {
        return (
            <table className="results_table">
                <thead>
                <tr>
                    <th>Test Date</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date) => (
                            <th key={date}>
                                {new Date(date).toLocaleDateString("pl-PL", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </th>
                        ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Day MP</td>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date) => {
                            const result = results.find((r) => r.test_date === date);
                            return <td key={date}>{result ? result.day_mp : ""}</td>;
                        })}
                </tr>
                <tr>
                    <td>Weight</td>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date) => {
                            const result = results.find((r) => r.test_date === date);
                            return (
                                <td key={date}>
                                    {result && result.weight ? result.weight : ""}
                                </td>
                            );
                        })}
                </tr>
                </tbody>
            </table>

        );
    }

    const handleNewTest = async (event) => {
        event.preventDefault();

        const test_date = test_dateRef.current.value;
        const day_mp = day_mpRef.current.value;
        const weight = weightRef.current.value;

        const { data, error } = await supabase
            .from('Results')
            .insert([
                { club_number: clubNumber, test_date: test_date, day_mp: day_mp, weight: weight }
            ]);

        if (data) {
            showSuccess('You have added a new test data');
        }

        if (error) {
            showError(error.message);
        }
    };

    async function fetchResults() {
        const { data, error } = await supabase
            .from("Results")
            .select("club_number, test_date, day_mp, weight")
            .eq("club_number", clubNumber);


        if (error) {
            console.error(error);
            setErrorMessage("Error occurred while fetching data");
        } else {
            const uniqueDates = Array.from(new Set(data.map((item) => item.test_date)));
            setDates(uniqueDates);
            setResults(data);
        }
    }

    const test_dateRef = useRef(null);
    const day_mpRef = useRef(null);
    const weightRef  = useRef(null);

    return (
        <div>
            <Toast ref={toast} />
            <div>
                <span>Enter club number:</span>
                <InputText
                    value={clubNumber}
                    onChange={handleClubNumberChange}
                    maxLength={4}
                    keyfilter="int"
                    style={{ marginLeft: "8px" }}
                />
                <Button label="Select club member" onClick={handleFetchClick} />
            </div>
            <h2>Member {clubNumber} info</h2>
            {errorMessage && (
                <div style={{ color: "red", marginTop: "8px" }}>{errorMessage}</div>
            )}
            <ShowMemberInfo clubNumber={clubNumber} />
            <div className="section_header">Tests Results</div>
            <span className="prev_results">
                {results.length > 0 ? renderResultsTable() : null}
            </span>
            <span className="last_results">
                <InputText
                    ref={test_dateRef}
                    placeholder="Date yyyy-mm-dd"
                />
                <InputText
                    ref={day_mpRef}
                    maxLength={2}
                    keyfilter="int"
                    placeholder="MP day"
                />
                <InputText
                    ref={weightRef}
                    keyfilter="num"
                />
            </span>

            <div className="main-container">
                <Button onClick={handleNewTest} className="btn-primary" label="ADD NEW TEST RESULTS" type="submit" />
                <span className="text-center">
                    <a href="/trainer">Return to main dashboard</a>
                </span>
            </div>
        </div>
    );
}

export default AddTestResults;