import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function Member() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const {pathname} = useLocation();
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

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();

        if (error) {
            showError(error.message);
            return;
        }

        localStorage.removeItem('userData');
        navigate('/login')
    }

    const [isUserLogged, setUserLogged] = useState(null);

    useEffect(() => {
        setUserLogged(!!localStorage.getItem('user.data'))
    },[])

    return (
        <div className="main-container">
            <Toast ref={toast} />
            <h1>
                Fitness Club Dashboard
            </h1>

            <div className="p-input-icon-right">
                <Button className="btn-primary" severity="info" outlined label="Select club member" />
                <i className="pi pi-user-edit" style={{ fontSize: '1.5rem',  color: "#2699f7" }}></i>
            </div>
            <div className="p-input-icon-right">
                <Button className="btn-primary" severity="info" outlined label="Add new club member" />
                <i className="pi pi-user" style={{ fontSize: '1.5rem', color: "#2699f7" }}></i>
            </div>
            <div className="p-input-icon-right">
                <Button className="btn-primary" severity="info" outlined label="Add info for the coming holidays" />
                <i className="pi pi-calendar-plus" style={{ fontSize: '1.5rem', color: "#2699f7" }}></i>
            </div>
            <div>
                <Button onClick={handleLogout}  className="btn-primary" label="LOG OUT"  type="submit"  />
            </div>

        </div>
    )
}

export default Member;