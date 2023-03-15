import React, { useRef, useState } from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
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

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const passwordValue = password;

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: passwordValue
        });

        let { data: clientData, error: clientError } = await supabase
            .from('Clients')
            .select('user_type')
            .eq('email', email);

        if (data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
            showSuccess('You have logged in your account');
            alert(clientData[0].user_type);
            if (clientData[0].user_type === "trainer") {
                navigate("/trainer");
            } else if (clientData[0].user_type === "adm") {
                navigate("/admin");
            } else {
                navigate("/member");
            }
        }

        if (error) {
            showError(error.message);
        }
    };

    const emailRef = useRef(null);
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <h2>Log in to your account</h2>
            <Outlet />
            <form className="login-form" onSubmit={handleLogin}>
                <span className="p-input-icon-left">
                    <i className="pi pi-envelope"></i>
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Your email"
                        ref={emailRef} />
                </span>
                    <Password
                        className="p-inputtext p-component p-filled p-password-input"
                        placeholder="Password"
                        feedback={false}
                        toggleMask
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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