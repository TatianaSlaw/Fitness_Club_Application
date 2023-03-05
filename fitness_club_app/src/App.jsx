import { useState } from 'react'
import './scss/App.scss'
// import {Route, Router, Routes} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import Header from "./views/Header.jsx";

function App() {

  return (
      <Router >
          <Header />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
  )
}

export default App
