import './scss/App.scss'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import Trainer from "./components/Trainer.jsx";
import AddNewMember from "./components/AddMember.jsx";
import AddTestResults from "./components/AddTestResults"
import AddOpenHours from "./components/AddOpenHours.jsx";
import UpdateMembership from "./components/UpdateMembership.jsx";
import Administrator from "./components/Administrator.jsx";
import Member from "./components/Member.jsx";

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