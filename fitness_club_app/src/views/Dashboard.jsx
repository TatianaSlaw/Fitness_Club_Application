import {Outlet} from "react-router-dom";
import {Button} from "primereact/button";
import React from "react";
import supabase from '../services/supabase';

function Dashboard() {
    return (
        <div className="main-container">

            <h1>
                Fitness Club Dashboard
            </h1>

            <div>
                <i className="pi pi-sign-out"></i>
                <a href="/login">Log out</a></div>
        </div>
    )
}

export default Dashboard;