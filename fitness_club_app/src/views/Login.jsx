import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function Login() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();

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

    const handleSignup = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
            showSuccess('You have logged in your account');
            navigate("/");
        }

        if (error) {
            showError(error.message);
        }
    };

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <h2>Log in to your account</h2>
            <form className="login-form" onSubmit={handleSignup}>
                <span className="p-input-icon-left">
                    <i className="pi pi-envelope"></i>
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Your email"
                        ref={emailRef} />
                </span>
                <span className="p-input-icon-right p-inputtext-lg">
                    {/*<Password placeholder="Password" ref={passwordRef} feedback={false} toggleMask />*/}
                    <InputText
                        className="p-inputtext p-component p-filled p-password-input"
                        placeholder="Password"
                        type="password"
                        ref={passwordRef} />
                    <i className="pi pi-eye"></i>
                </span>
                <span><a href="/reset">Forgot password?</a></span>
                <Button
                    className="btn-primary"
                    label="LOG IN"
                    type="submit" />
                <span><a href="/signup">Haven’t account?</a></span>
            </form>
        </div>
    )
}

export default Login;