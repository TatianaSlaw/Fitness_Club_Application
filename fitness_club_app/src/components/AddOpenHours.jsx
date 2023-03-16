import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';

import supabase from '../services/supabase';

function AddOpenHours() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [open_hours, setOpen_hours] = useState('');
    const clubId = 333;

    const showSuccess = (msg) => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: msg,
            life: 3000,
        });
    };
    const showError = (msg) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 3000,
        });
    };

    useEffect(() => {
        async function fetchInfo() {
            const { data, error } = await supabase
                .from('Info')
                .select("open_hours, id")
                .eq('club_id', 333);

            if (error) {
                setErrorMessage("Error occurred while fetching data");
            } else {
                setInfo(data);
            }
        }
        fetchInfo();
    }, []);

    const handleNewClubInfo = async (event) => {
        event.preventDefault();


        const { data, error } = await supabase
            .from('Info')
            .update({ open_hours: open_hours})
            .eq('club_id', clubId);

        if (!error) {
            showSuccess('You have successfully add new info');
            navigate(-1);
        }

        if (error) {
            showError(error.message);
        }
    };

    return (
        <div className="main-container">
            <Toast ref={toast} />
            <h3>Club Opening Hours for Upcoming Holidays</h3>
            {info.map((info) => (
                <div key={info.id}>
                    {info.open_hours}
                </div>
            ))}

            <form className="login-form" onSubmit={handleNewClubInfo}>
                 <span>
                        <InputTextarea autoResize
                                       value={open_hours}
                                       onChange={(e) => setOpen_hours(e.target.value)}
                                       rows={10}
                                       cols={20} />
                </span>
                <Button
                    className="btn-primary"
                    label="UPDATE INFO"
                    type="submit" />
                <span className="text-center">
                    <a onClick={() => navigate(-1)}
                       style={{ cursor: 'pointer' }}>
                        Return to main dashboard
                    </a>
                    <i className="pi pi-replay" style={{ fontSize: '1rem', color: "#2699f7" }}></i>
                </span>
            </form>
        </div>
    )
}
export default AddOpenHours;