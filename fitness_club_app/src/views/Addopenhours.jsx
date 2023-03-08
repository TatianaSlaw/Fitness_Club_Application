import React, { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';


import supabase from '../services/supabase';

function AddOpenHours() {
    const toast = useRef(null);
    const navigate = useNavigate();


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

    const handleNewClubInfo = async (event) => {
        event.preventDefault();

        const club_info = club_numberRef.current.value;

        let { data, error } = await supabase.auth.signInWithPassword({
            club_info: club_info,
        });

        if (data.user) {
            //localStorage.setItem('userData', JSON.stringify(data.user));
            showSuccess('You have successfully add new info');
            navigate("/");
        }

        if (error) {
            showError(error.message);
        }
    };

    const club_infoRef = useRef(null);

    return (
        <div className="main-container">
            <Toast ref={toast} />
            <h2>Add open hours or other info</h2>
            <form className="login-form" onSubmit={handleNewClubInfo}>
                 <span>
                        <InputTextarea autoResize
                                       ref={club_infoRef}
                                       rows={15}
                                       cols={20} />
                </span>
                <Button
                    className="btn-primary"
                    label="ADD INFO"
                    type="submit" />
                <span className="text-center"><a href="/trainer">Return to main dashboard</a></span>
            </form>
        </div>
    )
}

export default AddOpenHours;