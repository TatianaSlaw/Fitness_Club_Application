import {Outlet} from "react-router-dom";
import {Button} from "primereact/button";

function Dashboard() {
    return (
        <div>
            <h1>
                Welcome to Fitness Club Dashboard
            </h1>

            <div><a href="/login">Log out</a></div>
        </div>
    )
}

export default Dashboard;