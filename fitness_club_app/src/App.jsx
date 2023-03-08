import { useState } from 'react'
import './scss/App.scss'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Trainer from "./views/Trainer.jsx";
import Administrator from "./views/Administrator.jsx";
import Member from "./views/Member.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import Header from "./views/Header.jsx";
import PasswordReset from "./views/Passwordreset.jsx";
import AddNewMember from "./views/Addmember.jsx";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import AddNewmember from "./views/Addmember.jsx";
import AddOpenHours from "./views/Addopenhours.jsx";

function App() {

  return (
      <Router >
          <Header />
            <Routes>
            <Route path="/" element={<Trainer />} />
            <Route path="/admin" element={<Administrator />} />
            <Route path="/addnew" element={<AddNewMember />} />
            <Route path="/member" element={<Member />} />
            <Route path="/openhours" element={<AddOpenHours />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<PasswordReset />} />

        </Routes>
      </Router>
  )
}

export default App
