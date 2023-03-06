import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/saga-blue/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';

import supabase from '../services/supabase';

function Signup() {
    const toast = useRef(null);

    const showSuccess = (e,msg) => {
        e.preventDefault();
        toast.current.show({
            severity:'success',
            summary: 'Success',
            detail: msg,
            life: 3000,
        });
    };
    const showError = (e,msg) => {
        toast.current.show({
            severity:'error',
            summary: 'Error',
            detail: msg,
            life: 3000,
        });
    };

    const [club_number, setClubNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login-container">
            <Toast ref={toast} />
            <h2>Create your account</h2>
            <form className="login-form">
                <span className="p-input-icon-left">
                    <i className="pi pi-id-card"></i>
                    <InputText className="p-inputtext-lg" placeholder="Your Club Number" keyfilter="int" value={club_number} onChange={(e) => setClubNumber(e.target.value)} />
                </span>
                <span className="p-input-icon-left">
                    <i className="pi pi-envelope"></i>
                    <InputText className="p-inputtext-lg" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>
                <span className="p-inputtext-lg">
                    <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </span>
                <span className="p-inputtext-lg">
                    <Password placeholder="Reenter password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </span>
                <Button onClick={(e) => showSuccess(e,'Congratulations! You have successfully sign up your account')} className="btn-primary" label="SIGN UP" type="submit"  />
                <span><a href="/login">Already have account?</a></span>
            </form>
        </div>
    )
}

export default Signup;