import './scss/App.scss'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./views/Header.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import PasswordReset from "./views/PasswordReset.jsx";
import Trainer from "./views/Trainer.jsx";
import AddNewMember from "./views/AddMember.jsx";
import AddTestResults from "./views/AddTestResults"
import AddOpenHours from "./views/AddOpenHours.jsx";
import UpdateMembership from "./views/UpdateMembership.jsx";
import Administrator from "./views/Administrator.jsx";
import Member from "./views/Member.jsx";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


function App() {

  return (
      <Router >
          <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<PasswordReset />} />
                    <Route path="/trainer" element={<Trainer />} />
                    <Route path="/addnew" element={<AddNewMember />} />
                    <Route path="/addtest" element={<AddTestResults />} />
                    <Route path="/openhours" element={<AddOpenHours />} />
                    <Route path="/membership" element={<UpdateMembership />} />
                <Route path="/member" element={<Member />} />
                <Route path="/admin" element={<Administrator />} />
        </Routes>
      </Router>
  )
}

export default App