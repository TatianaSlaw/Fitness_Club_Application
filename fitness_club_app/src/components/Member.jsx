import React, { useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTabIndex } from 'react-tabindex';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import supabase from "../services/supabase";

import ShowMemberInfo from "./ShowMemberInfo.jsx";
import Footer from "./Footer.jsx";

function Member() {
    const clubNumber = localStorage.getItem("clubNumber");
    const [errorMessage, setErrorMessage] = useState("");
    const [results, setResults] = useState([]);
    const [dates, setDates] = useState([]);
    const toast = useRef(null);
    const navigate = useNavigate();
    const tabIndex = useTabIndex();

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
                    <th className="row_header">Day MС</th>
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
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
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="icon-caliper">Lower leg</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.lower_leg_fold - nextResult.lower_leg_fold;
                                }
                            }
                            return [
                                <td key={date}>{result && result.lower_leg_fold ? result.lower_leg_fold : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Metabolic age</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.metabolic_age - nextResult.metabolic_age;
                                }
                            }
                            return [
                                <td key={date}>{result && result.metabolic_age ? result.metabolic_age : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Muscle mass, %</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.muscle_mass - nextResult.muscle_mass;
                                }
                            }
                            return [
                                <td key={date}>{result && result.muscle_mass ? result.muscle_mass : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Body water, %</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.body_water - nextResult.body_water;
                                }
                            }
                            return [
                                <td key={date}>{result && result.body_water ? result.body_water : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Fat, %</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.fat - nextResult.fat;
                                }
                            }
                            return [
                                <td key={date}>{result && result.fat ? result.fat : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Bone</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.bone - nextResult.bone;
                                }
                            }
                            return [
                                <td key={date}>{result && result.bone ? result.bone : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Visceral fat</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.visceral_fat - nextResult.visceral_fat;
                                }
                            }
                            return [
                                <td key={date}>{result && result.visceral_fat ? result.visceral_fat : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">BMI</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.bmi - nextResult.bmi;
                                }
                            }
                            return [
                                <td key={date}>{result && result.bmi ? result.bmi : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference).toFixed(1) : ""}
                                </td>

                            ];
                        })}
                </tr>
                <tr>
                    <th className="row_header">Physique rating</th>
                    {dates
                        .slice()
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((date, index, array) => {
                            const result = results.find((r) => r.test_date === date);
                            let difference = "";
                            if (index < array.length - 1) {
                                const nextResult = results.find((r) => r.test_date === array[index + 1]);
                                if (result && nextResult) {
                                    difference = result.physique_rating - nextResult.physique_rating;
                                }
                            }
                            return [
                                <td key={date}>{result && result.physique_rating ? result.physique_rating : ""}</td>,
                                index < array.length - 1 && <td key={date + "-difference"} className={difference < 0 ? "negative" : difference > 0 ? "positive" : ""}>
                                    {difference !== null ? Math.abs(difference) : ""}
                                </td>

                            ];
                        })}
                </tr>
                </tbody>
            </table>
        );
    }

    useEffect(() => {
    async function fetchResults() {
        const { data, error } = await supabase
            .from("Results")
            .select("club_number, test_date, day_mp, weight, neck, forearm, above_bust, bust, waist, hips, thigh, lower_leg, forearm_fold, biceps_fold, triceps_fold, upper_press_fold, lower_press_fold, upper_back_fold, lower_back_fold, waist_fold, back_thigh_fold, outer_thigh_fold, inner_thigh_fold, front_thigh_fold, lower_leg_fold, metabolic_age, muscle_mass, body_water, fat, bone, visceral_fat, bmi, physique_rating")
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
        fetchResults();
    }, [clubNumber]);

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();

        if (error) {
            showError(error.message);
            return;
        }
        localStorage.removeItem('userData');
        navigate('/')
    }
    const [isUserLogged, setUserLogged] = useState(null);
    useEffect(() => {
        setUserLogged(!!localStorage.getItem('user.data'))
    },[])

    return (
        <div className="member-results-main-container">
            <Toast ref={toast} />

            <h2>Member {clubNumber} info</h2>
            {errorMessage && (
                <div style={{ color: "red", marginTop: "8px" }}>{errorMessage}</div>
            )}
            <ShowMemberInfo clubNumber={clubNumber} />

            <h2 className="contact-header">Tests Results</h2>
            <div className="results-container">
                <span className="prev_results">
                    <div className="table-container">
                        {results.length > 0 ? renderResultsTable() : null}
                    </div>
                </span>
            </div>

            <Footer />

            <div>
                <Button onClick={handleLogout}
                        className="btn-primary"
                        label="LOG OUT"
                        type="submit"  />
            </div>
        </div>
    );
}

export default Member;