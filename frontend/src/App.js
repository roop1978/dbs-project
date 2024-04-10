import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Menu from "./pages/Menu";
import LandingPage from "./components/LandingPage";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
const App = () => {
  return (
    <Router>
     {/* <AdminLogin></AdminLogin> */}
     <StudentLogin></StudentLogin>
    </Router>
  );
};

export default App;
