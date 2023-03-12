import React, { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useTabIndex } from 'react-tabindex';
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
                    <th className="pin">Test Date</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date) => (
                            <th key={date} colSpan={2}>
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
                    <th className="row_header">Day MP</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date) => {
                            const result = results.find((r) => r.test_date === date);
                            return <td key={date} colSpan={2}>{result ? result.day_mp : ""}</td>;
                        })}
                </tr>
                <tr>
                    <th className="icon-wieght">Weight</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.weight - nextResult.weight;
                                }
                            }
                            return [
                                <td key={date}>{result && result.weight ? result.weight : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                <th className="icon-ruler">Neck</th>
                {dates
                    .slice()
                    .sort((a, b) => new Date(b) - new Date(a))
                    .map((date, index, array) => {
                        const result = results.find((r) => r.test_date === date);
                        let difference = "";
                        if (index < array.length - 1) {
                            const nextResult = results.find((r) => r.test_date === array[index + 1]);
                            if (result && nextResult) {
                                difference = result.neck - nextResult.neck;
                            }
                        }
                        return [
                            <td key={date}>{result && result.neck ? result.neck : ""}</td>,
                            index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                {difference !== null ? Math.abs(difference) : ""}
                            </td>

                        ];
                    })}
                </tr>
                <tr>
                    <th className="icon-ruler">Forearm</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.forearm - nextResult.forearm;
                                }
                            }
                            return [
                                <td key={date}>{result && result.forearm ? result.forearm : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>

                <tr>
                    <th className="icon-ruler">Above bust</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.above_bust - nextResult.above_bust;
                                }
                            }
                            return [
                                <td key={date}>{result && result.above_bust ? result.above_bust : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>

                <tr>
                    <th className="icon-ruler">Bust</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.bust - nextResult.bust;
                                }
                            }
                            return [
                                <td key={date}>{result && result.bust ? result.bust : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-ruler">Waist</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.waist - nextResult.waist;
                                }
                            }
                            return [
                                <td key={date}>{result && result.waist ? result.waist : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-ruler">Hips</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.hips - nextResult.hips;
                                }
                            }
                            return [
                                <td key={date}>{result && result.hips ? result.hips : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-ruler">Thigh</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.thigh - nextResult.thigh;
                                }
                            }
                            return [
                                <td key={date}>{result && result.thigh ? result.thigh : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-ruler">Lower leg</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.lower_leg - nextResult.lower_leg;
                                }
                            }
                            return [
                                <td key={date}>{result && result.lower_leg ? result.lower_leg : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Forearm</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.forearm_fold - nextResult.forearm_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.forearm_fold ? result.forearm_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Biceps</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.biceps_fold - nextResult.biceps_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.biceps_fold ? result.biceps_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Triceps</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.triceps_fold - nextResult.triceps_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.triceps_fold ? result.triceps_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Upper press</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.upper_press_fold - nextResult.upper_press_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.upper_press_fold ? result.upper_press_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Lower press</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.lower_press_fold - nextResult.lower_press_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.lower_press_fold ? result.lower_press_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Upper back</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.upper_back_fold - nextResult.upper_back_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.upper_back_fold ? result.upper_back_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Lower back</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.lower_back_fold - nextResult.lower_back_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.lower_back_fold ? result.lower_back_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Waist</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.waist_fold - nextResult.waist_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.waist_fold ? result.waist_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Back thigh</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.back_thigh_fold - nextResult.back_thigh_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.back_thigh_fold ? result.back_thigh_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Outer thigh</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.outer_thigh_fold - nextResult.outer_thigh_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.outer_thigh_fold ? result.outer_thigh_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Inner thigh</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.inner_thigh_fold - nextResult.inner_thigh_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.inner_thigh_fold ? result.inner_thigh_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Front thigh</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.front_thigh_fold - nextResult.front_thigh_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.front_thigh_fold ? result.front_thigh_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                {/*outer_thigh_fold*/}
                </tbody>
            </table>

        );
    }

    const handleNewTest = async (event) => {
        event.preventDefault();

        const test_date = test_dateRef.current.value;
        const day_mp = day_mpRef.current.value;
        const weight = weightRef.current.value;
        const neck = neckRef.current.value;
        const forearm = forearmRef.current.value;
        const above_bust = above_bustRef.current.value;
        const bust = bustRef.current.value;
        const waist = waistRef.current.value;
        const hips = hipsRef.current.value;
        const thigh = hipsRef.current.value;
        const lower_leg = lower_legRef.current.value;
        const forearm_fold = forearm_foldRef.current.value;
        const biceps_fold = biceps_foldRef.current.value;
        const triceps_fold = triceps_foldRef.current.value;
        const upper_press_fold = upper_press_foldRef.current.value;
        const lower_press_fold = lower_press_foldRef.current.value;
        const upper_back_fold = upper_back_foldRef.current.value;
        const lower_back_fold = lower_back_foldRef.current.value;
        const waist_fold = waist_foldRef.current.value;
        const back_thigh_fold = back_thigh_foldRef.current.value;
        const outer_thigh_fold = back_thigh_foldRef.current.value;
        const inner_thigh_fold = back_thigh_foldRef.current.value;
        const front_thigh_fold = back_thigh_foldRef.current.value;

        //outer_thigh_fold

        const { data, error } = await supabase
            .from('Results')
            .insert([
                { club_number: clubNumber,
                    test_date: test_date,
                    day_mp: day_mp,
                    weight: weight,
                    neck: neck,
                    forearm:forearm,
                    above_bust: above_bust,
                    bust: bust,
                    waist: waist,
                    hips: hips,
                    thigh: thigh,
                    lower_leg: lower_leg,
                    forearm_fold: forearm_fold,
                    biceps_fold: biceps_fold,
                    triceps_fold: triceps_fold,
                    upper_press_fold: upper_press_fold,
                    lower_press_fold: lower_press_fold,
                    upper_back_fold: upper_back_fold,
                    lower_back_fold: lower_back_fold,
                    waist_fold: waist_fold,
                    back_thigh_fold: back_thigh_fold,
                    outer_thigh_fold: outer_thigh_fold,
                    inner_thigh_fold: inner_thigh_fold,
                    front_thigh_fold: front_thigh_fold

                }
            ]);


        if (!error) {
            showSuccess('You have added a new test data');
        }

        if (error) {
            showError(error.message);
        }
    };

    async function fetchResults() {
        const { data, error } = await supabase
            .from("Results")
            .select("club_number, test_date, day_mp, weight, neck, forearm, above_bust, bust, waist, hips, thigh, lower_leg, forearm_fold, biceps_fold, triceps_fold, upper_press_fold, lower_press_fold, upper_back_fold, lower_back_fold, waist_fold, back_thigh_fold, outer_thigh_fold, inner_thigh_fold, front_thigh_fold")
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
    const neckRef  = useRef(null);
    const forearmRef = useRef(null);
    const above_bustRef = useRef(null);
    const bustRef = useRef(null);
    const waistRef = useRef(null);
    const hipsRef = useRef(null);
    const thighRef = useRef(null);
    const lower_legRef = useRef(null);
    const forearm_foldRef = useRef(null);
    const biceps_foldRef = useRef(null);
    const triceps_foldRef = useRef(null);
    const upper_press_foldRef = useRef(null);
    const lower_press_foldRef = useRef(null);
    const upper_back_foldRef = useRef(null);
    const lower_back_foldRef = useRef(null);
    const waist_foldRef = useRef(null);
    const back_thigh_foldRef = useRef(null);
    const outer_thigh_foldRef = useRef(null);
    const inner_thigh_foldRef = useRef(null);
    const front_thigh_foldRef = useRef(null);

    //outer_thigh_fold
    const tabIndex = useTabIndex();

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
            <span className="prev_results " role="region" aria-label="test results table" tabIndex={tabIndex} >
                {results.length > 0 ? renderResultsTable() : null}
            </span>
            <span className="last_results">
                <InputText
                    ref={test_dateRef}
                    placeholder="yyyy-mm-dd"
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
                    placeholder="Weight"
                />
                <InputText
                    ref={neckRef}
                    keyfilter="num"
                    placeholder="Neck"
                />
                <InputText
                    ref={forearmRef}
                    keyfilter="num"
                    placeholder="Forearm"
                />
                <InputText
                    ref={above_bustRef}
                    keyfilter="num"
                    placeholder="Above bust"
                />
                <InputText
                    ref={bustRef}
                    keyfilter="num"
                    placeholder="Bust"
                />
                <InputText
                    ref={waistRef}
                    keyfilter="num"
                    placeholder="Waist"
                />
                <InputText
                    ref={hipsRef}
                    keyfilter="num"
                    placeholder="Hips"
                />
                <InputText
                    ref={thighRef}
                    keyfilter="num"
                    placeholder="Thigh"
                />
                <InputText
                    ref={lower_legRef}
                    keyfilter="num"
                    placeholder="Lower leg"
                />
                <InputText
                    ref={forearm_foldRef}
                    keyfilter="num"
                    placeholder="Forearm"
                />
                <InputText
                    ref={biceps_foldRef}
                    keyfilter="num"
                    placeholder="Biceps"
                />
                <InputText
                    ref={triceps_foldRef}
                    keyfilter="num"
                    placeholder="Triceps"
                />
                <InputText
                    ref={upper_press_foldRef}
                    keyfilter="num"
                    placeholder="Upper press"
                />
                <InputText
                    ref={lower_press_foldRef}
                    keyfilter="num"
                    placeholder="Lower press"
                />
                <InputText
                    ref={upper_back_foldRef}
                    keyfilter="num"
                    placeholder="Upper back"
                />
                <InputText
                    ref={lower_back_foldRef}
                    keyfilter="num"
                    placeholder="Lower back"
                />
                <InputText
                    ref={waist_foldRef}
                    keyfilter="num"
                    placeholder="Waist"
                />
                <InputText
                    ref={back_thigh_foldRef}
                    keyfilter="num"
                    placeholder="Back thigh"
                />
                <InputText
                    ref={outer_thigh_foldRef}
                    keyfilter="num"
                    placeholder="Outer thigh"
                />
                <InputText
                ref={inner_thigh_foldRef}
                keyfilter="num"
                placeholder="Inner thigh"
                />
                <InputText
                    ref={front_thigh_foldRef}
                    keyfilter="num"
                    placeholder="Front thigh"
                />

                {/*outer_thigh_fold*/}
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