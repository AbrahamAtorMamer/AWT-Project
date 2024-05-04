import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarHook from "./components/NavBarHook/NavBarHook";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateCampaign from './pages/Campaign/CreateCampaign';
import RegistrationPage from "./pages/SignupPage/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationForm from "./components/Auth/Signup/RegistrationForm";

const App = () => {
  // Check if the token exists in localStorage
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <Router>
      <Fragment>
        {/* {isAuthenticated && <NavBarHook />} Render NavBarHook only if authenticated */}
        {/* <NavBar />  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route exact element={<PrivateRoute />}>
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;

