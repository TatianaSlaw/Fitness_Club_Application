import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import {Toast} from "primereact/toast";

import supabase from '../services/supabase';


function Login() {
    const toast = useRef(null);
    const showSuccess = (e, msg) => {
        e.preventDefault();
        toast.current.show({
            severity:'success',
            summary: 'Success',
            detail: msg,
            life: 3000,
        });
    };
    const showError = (e, msg) => {
        toast.current.show({
            severity:'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000,
        });
    };

    const [club_number, setClubNumber] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login-container">
            <Toast ref={toast} />
             <h2><i className="pi pi-sign-in"></i>Log in your account</h2>
            <form className="login-form">
                <span className="p-input-icon-left">
                    <i className="pi pi-id-card"></i>
                    <InputText className="p-inputtext-lg" placeholder="Your Club Number" keyfilter="int" value={club_number} onChange={(e) => setClubNumber(e.target.value)} />
                </span>
                <span>
                    <Password className="p-inputtext-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </span>
                <span>Forgot password?</span>
                <Button onClick={(e) => showSuccess(e,'Congratulations! You are logged in your account')} className="btn-primary" label="LOG IN" type="submit"  />
                <span><a href="/signup">Haven’t account?</a></span>
            </form>
        </div>
    )
}

export default Login;