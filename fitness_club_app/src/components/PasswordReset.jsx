import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from "../services/supabase.js";

function PasswordReset() {

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

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        let {data, error} = await supabase.auth.resetPasswordForEmail(email);

        if (data.user) {
            showSuccess('We sent you email to reset your password');
            navigate("/");
        }

        if (error) {
            showError(error.message);
        }
    }

    const emailRef = useRef(null);

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <h2>Reset your password</h2>
            <form className="login-form" onSubmit={handlePasswordReset}>
                <span className="p-input-icon-left">
                    <i className="pi pi-envelope"></i>
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Your email"
                        ref={emailRef} />
                </span>

                <Button
                    className="btn-primary"
                    label="RESET PASSWORD"
                    type="submit" />
                <span><a href="/signup">Haven’t account?</a></span>
            </form>
        </div>
    )
}

export default PasswordReset;