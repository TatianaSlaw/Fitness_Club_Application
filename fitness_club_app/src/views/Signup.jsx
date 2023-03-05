import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';

function Login() {
    const [club_number, setClubNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <h2>Create your account</h2>
            <form>
                <span className="p-float-label">
                    <InputText placeholder="Your Club Number" value={club_number} onChange={(e) => setClubNumber(e.target.value)} />
                </span>
                <span className="p-float-label">
                    <InputText placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>
                <span className="card flex justify-content-center">
                    <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </span>
                <span className="card flex justify-content-center">
                    <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                </span>
                <Button label="Sign up" type="submit"  />
                <div><a href="/login">Already have account?</a></div>
            </form>
        </div>
    )
}

export default Login;