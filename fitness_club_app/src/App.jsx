import { useState } from 'react'
import './scss/App.scss'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import Header from "./views/Header.jsx";
import PasswordReset from "./views/Passwordreset.jsx";

import 'primereact/resources/themes/saga-blue/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';

function App() {

  return (
      <Router >
          <Header />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<PasswordReset />} />

        </Routes>
      </Router>
  )
}

export default App
