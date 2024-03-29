import React, {useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function Signup() {
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

    const handleLogin = () => {
        navigate('/');
    }

    const handleSignup = async (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = password;
        const password2Value = password2;
        const clubNumberValue = clubNumberRef.current.value;

        if (password !== password2) {
            showError("Passwords don't match");
            return;
        }

        let { data: clientData, error: clientError } = await supabase
            .from('Clients')
            .select('email')
            .eq('club_number', clubNumberValue);


        if (clientData.length === 0) {
            showError("Club number not found. Please enter a valid club number.");
            return;
        }


        if (clientData[0].email.length > 0) {
            showError("An account with this club number already exists. Login or reset your password.");
            return;
        }

        if (clientError) {
            showError("Error checking club number: " + clientError.message);
            return;
        }

        let { data, error } = await supabase.auth.signUp({
            email: emailValue,
            password: password,
        });

        if (data.user) {
            showSuccess('Congratulations! You have successfully signed up for your account');
            navigate("/");
        }

        if (error) {
            showError(error.message);
        }
    };

    const clubNumberRef = useRef(null);
    const emailRef = useRef(null);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <div className="signup-container">
            <Toast ref={toast} />
            <h2>Create your account</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <span className="p-input-icon-left">
                    <i className="pi pi-id-card"></i>
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Your 4 digit club number"
                        maxLength={4}
                        keyfilter="int"
                        ref={clubNumberRef} />
                </span>
                <span className="p-input-icon-left">
                    <i className="pi pi-envelope"></i>
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Your email"
                        ref={emailRef} />
                </span>
                <Password className="p-inputtext p-component p-filled p-password-input"
                        placeholder="Password"
                        feedback={false}
                        toggleMask
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                <Password className="p-inputtext p-component p-filled p-password-input"
                        placeholder="Reenter password"
                        feedback={false}
                        toggleMask
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}/>
                <Button className="btn-primary"
                    label="SIGN UP"
                    type="submit" />
                <Button onClick={handleLogin}
                        link
                        label="Already have account?"  />
            </form>
        </div>
    )
}

export default Signup;